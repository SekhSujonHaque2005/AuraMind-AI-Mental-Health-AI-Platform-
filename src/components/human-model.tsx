
'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface HumanModelProps {
    isSpeaking: boolean;
}

const HumanModel: React.FC<HumanModelProps> = ({ isSpeaking }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const modelRef = useRef<THREE.Group>();
    const headRef = useRef<THREE.Mesh>();

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 3.5);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        currentMount.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI / 2.2;
        controls.maxPolarAngle = Math.PI / 2.2;
        controls.target.set(0, 0.2, 0);


        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0x87CEEB, 1.5);
        keyLight.position.set(5, 5, 5);
        keyLight.castShadow = true;
        scene.add(keyLight);
        
        const fillLight = new THREE.DirectionalLight(0x9370DB, 0.8);
        fillLight.position.set(-5, 2, 5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 1);
        rimLight.position.set(0, 5, -10);
        scene.add(rimLight);


        // Material
        const material = new THREE.MeshStandardMaterial({
            color: 0x9e9e9e,
            metalness: 0.8,
            roughness: 0.35,
            emissive: 0x1a1a1a,
        });
        
        // Model Group
        const model = new THREE.Group();
        modelRef.current = model;
        scene.add(model);

        // Create Humanoid Shape
        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), material);
        head.position.y = 1.3;
        head.castShadow = true;
        model.add(head);
        headRef.current = head;

        // Neck
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16), material);
        neck.position.y = 1.05;
        neck.castShadow = true;
        model.add(neck);

        // Torso
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 1.2, 16), material);
        torso.position.y = 0.3;
        torso.castShadow = true;
        model.add(torso);
        
        // Hips
        const hips = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), material);
        hips.position.y = -0.3;
        hips.scale.y = 0.5;
        hips.castShadow = true;
        model.add(hips);

        // Limbs function
        const createLimb = (width: number, height: number, depth: number) => {
            const limb = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
            limb.castShadow = true;
            return limb;
        }

        // Shoulders
        const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), material);
        shoulderL.position.set(-0.4, 0.8, 0);
        const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), material);
        shoulderR.position.set(0.4, 0.8, 0);
        model.add(shoulderL, shoulderR);

        // Arms
        const upperArmL = createLimb(0.15, 0.6, 0.15);
        upperArmL.position.set(-0.4, 0.4, 0);
        const upperArmR = createLimb(0.15, 0.6, 0.15);
        upperArmR.position.set(0.4, 0.4, 0);
        model.add(upperArmL, upperArmR);

        // Legs
        const upperLegL = createLimb(0.2, 0.8, 0.2);
        upperLegL.position.set(-0.2, -1, 0);
        const upperLegR = createLimb(0.2, 0.8, 0.2);
        upperLegR.position.set(0.2, -1, 0);
        model.add(upperLegL, upperLegR);
        

        // Animation
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            if (modelRef.current && headRef.current) {
                // Subtle floating animation
                modelRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.05 - 0.2;
                
                // Head nod for speaking
                const headNodAngle = isSpeaking ? Math.sin(elapsedTime * 10) * 0.05 : 0;
                headRef.current.rotation.x = headNodAngle;

                // Subtle body sway
                modelRef.current.rotation.y = Math.sin(elapsedTime * 0.3) * 0.1;
            }
            
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            // Dispose geometries and materials if needed
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default HumanModel;
