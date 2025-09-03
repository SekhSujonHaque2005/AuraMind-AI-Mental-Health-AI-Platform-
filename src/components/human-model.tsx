
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

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 2.5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI / 2.5;
        controls.maxPolarAngle = Math.PI / 2.5;


        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x87CEEB, 2, 100); // Light blue light
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x9370DB, 2, 100); // Medium purple light
        pointLight2.position.set(-2, -3, -4);
        scene.add(pointLight2);

        // Material
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: true,
            emissive: 0x87CEEB,
            emissiveIntensity: 0.1,
            metalness: 0.7,
            roughness: 0.4
        });
        
        // Model Group
        const model = new THREE.Group();
        modelRef.current = model;
        scene.add(model);

        // Create Humanoid Shape
        // Head
        const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 1), material);
        head.position.y = 1;
        model.add(head);

        // Torso
        const torsoGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1, 8);
        const torso = new THREE.Mesh(torsoGeometry, material);
        model.add(torso);

        // Limbs function
        const createLimb = (height: number, radius: number, position: THREE.Vector3) => {
            const limb = new THREE.Mesh(new THREE.CapsuleGeometry(radius, height, 4, 8), material);
            limb.position.copy(position);
            return limb;
        }

        // Arms
        const upperArmL = createLimb(0.4, 0.08, new THREE.Vector3(-0.5, 0.3, 0));
        const upperArmR = createLimb(0.4, 0.08, new THREE.Vector3(0.5, 0.3, 0));
        model.add(upperArmL, upperArmR);

        // Legs
        const upperLegL = createLimb(0.5, 0.1, new THREE.Vector3(-0.2, -0.8, 0));
        const upperLegR = createLimb(0.5, 0.1, new THREE.Vector3(0.2, -0.8, 0));
        model.add(upperLegL, upperLegR);
        

        // Animation
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            if (modelRef.current) {
                // Subtle floating animation
                modelRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.05;
                
                // Speaking animation
                const targetScale = isSpeaking ? 1.05 : 1;
                head.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
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
