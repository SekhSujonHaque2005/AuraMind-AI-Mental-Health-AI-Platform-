
"use client";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const TinderContext = createContext<{
  setAsSwiped: (id: number) => void;
}>({
  setAsSwiped: (id: number) => {},
});

export const TinderCards = ({
  cards,
  className,
}: {
  cards: React.ReactNode[];
  className?: string;
}) => {
  const [swiped, setSwiped] = useState<number[]>([]);

  const setAsSwiped = (id: number) => {
    setSwiped((prev) => [...prev, id]);
  };

  return (
    <TinderContext.Provider value={{ setAsSwiped }}>
      <div
        className={cn(
          "relative h-[500px] w-full max-w-md flex items-center justify-center",
          className,
        )}
      >
        {cards
          .filter((_, index) => !swiped.includes(index))
          .map((card, index) => (
            <Card key={index} index={index}>
              {card}
            </Card>
          ))}
      </div>
    </TinderContext.Provider>
  );
};

export const Card = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const { setAsSwiped } = useContext(TinderContext);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState<"left" | "right" | "center">(
    "center",
  );
  const [velocity, setVelocity] = useState(0);

  const getVariant = (
    constrained: boolean,
    direction: "left" | "right" | "center",
  ) => {
    if (!constrained) {
      return direction === "left" ? "exitLeft" : "exitRight";
    }
    return "center";
  };

  const flyAway = (min: number) => {
    const flyAwayDistance = (direction: "left" | "right") => {
      const parentWidth =
        ref.current?.parentElement?.getBoundingClientRect().width || 0;
      const childWidth = ref.current?.getBoundingClientRect().width || 0;
      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };
    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start(getVariant(false, direction));
      setAsSwiped(index);
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);

  useEffect(() => {
    const unsubscribeX = x.on("change", (latest) => {
      if (ref.current) {
        const childNode = ref.current;
        const parentNode = ref.current.parentElement;
        if (parentNode) {
          const halfWidth = parentNode.getBoundingClientRect().width / 2;
          const childWidth = childNode.getBoundingClientRect().width / 2;

          if (latest > halfWidth - childWidth) {
            setDirection("right");
          } else if (latest < -(halfWidth - childWidth)) {
            setDirection("left");
          } else {
            setDirection("center");
          }
        }
      }
    });

    return () => {
      unsubscribeX();
    };
  }, [x]);
  return (
    <motion.div
      className="[perspective:3000px] absolute"
      style={{
        zIndex: -index + 100, // a simple way to stack cards
      }}
      variants={{
        center: {
          x: 0,
          y: 0,
          scale: 1 - index * 0.05,
          opacity: 1,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        },
        exitRight: {
          x: 300,
          y: 100,
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.5 },
        },
        exitLeft: {
          x: -300,
          y: 100,
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.5 },
        },
      }}
      initial={false}
      animate={controls}
      drag
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      dragElastic={0.2}
      ref={ref}
      onDrag={(event, info) => {
        x.set(info.offset.x);
        setVelocity(info.velocity.x);
      }}
      onDragEnd={() => flyAway(500)}
      style={{
        x,
        rotate,
      }}
      whileTap={{
        scale: 1.05 - index * 0.05,
      }}
    >
      <div className="relative min-h-96 w-80 transform-3d select-none overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl dark:bg-neutral-900">
        {children}
        <div
          className="pointer-events-none absolute inset-0 bg-white select-none"
          style={{
            opacity: useTransform(x, [-100, 0, 100], [1, 0, 1]),
            mixBlendMode: "overlay",
          }}
        ></div>
      </div>
    </motion.div>
  );
};
