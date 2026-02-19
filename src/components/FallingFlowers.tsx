import { useEffect, useState } from "react";

const Flower = ({ style }: { style: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 100"
    className="absolute text-orange-400/60"
    style={style}
    width="40"
    height="40"
    fill="currentColor"
  >
    {/* Center */}
    <circle cx="50" cy="50" r="15" className="text-yellow-200" fill="currentColor" />
    {/* Petals - Simple 6-petal shape */}
    <path d="M50 20 C60 20 65 35 50 50 C35 35 40 20 50 20 Z" transform="rotate(0 50 50)" fill="#fb923c" />
    <path d="M50 20 C60 20 65 35 50 50 C35 35 40 20 50 20 Z" transform="rotate(60 50 50)" fill="#fb923c" />
    <path d="M50 20 C60 20 65 35 50 50 C35 35 40 20 50 20 Z" transform="rotate(120 50 50)" fill="#fb923c" />
    <path d="M50 20 C60 20 65 35 50 50 C35 35 40 20 50 20 Z" transform="rotate(180 50 50)" fill="#fb923c" />
    <path d="M50 20 C60 20 65 35 50 50 C35 35 40 20 50 20 Z" transform="rotate(240 50 50)" fill="#fb923c" />
    <path d="M50 20 C60 20 65 35 50 50 C35 35 40 20 50 20 Z" transform="rotate(300 50 50)" fill="#fb923c" />
    <circle cx="50" cy="50" r="12" fill="#fef08a" />
  </svg>
);

export default function FallingFlowers() {
  const [flowers, setFlowers] = useState<
    { id: number; left: string; duration: string; delay: string; size: number }[]
  >([]);

  useEffect(() => {
    // Generate random flowers
    const count = 30;
    const newFlowers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 10}s`, // 10-20s
      delay: `${Math.random() * 10}s`,
      size: Math.random() * 20 + 20, // 20-40px
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10vh) rotate(0deg) translateX(0px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg) translateX(20px);
              opacity: 0;
            }
          }
        `}
      </style>
      {flowers.map((f) => (
        <Flower
          key={f.id}
          style={{
            left: f.left,
            animation: `fall ${f.duration} linear ${f.delay} infinite`,
            width: f.size,
            height: f.size,
          }}
        />
      ))}
    </div>
  );
}
