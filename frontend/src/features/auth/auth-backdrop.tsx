import type { CSSProperties } from 'react';
import styles from './auth-backdrop.module.css';
import { BrandWhiteIcon } from '@/components/icons/brand/white-icon';

// Fixed values (no Math.random) so server and client render identically.
const BLOCKS = [
    { left: '8%', size: 28, duration: 18, delay: -2, opacity: 0.35 },
    { left: '18%', size: 14, duration: 14, delay: -9, opacity: 0.25 },
    { left: '27%', size: 40, duration: 24, delay: -14, opacity: 0.2 },
    { left: '38%', size: 20, duration: 16, delay: -5, opacity: 0.35 },
    { left: '49%', size: 12, duration: 12, delay: -7, opacity: 0.3 },
    { left: '58%', size: 34, duration: 22, delay: -18, opacity: 0.25 },
    { left: '68%', size: 18, duration: 15, delay: -1, opacity: 0.35 },
    { left: '77%', size: 44, duration: 26, delay: -11, opacity: 0.18 },
    { left: '86%', size: 16, duration: 13, delay: -6, opacity: 0.3 },
    { left: '93%', size: 26, duration: 20, delay: -16, opacity: 0.25 },
];

export function AuthBackdrop() {
    return (
        <div
            aria-hidden="true"
            className="relative hidden overflow-hidden bg-primary lg:block"
        >
            {/* Base gradient + panning grid */}
            <div
                className={`absolute inset-0 ${styles.grid}`}
                style={{
                    backgroundImage: `
                        linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px),
                        linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px),
                        linear-gradient(135deg, oklch(0.62 0.22 263), oklch(0.28 0.12 264))
                    `,
                    backgroundSize: '48px 48px, 48px 48px, 100% 100%',
                    maskImage:
                        'radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.5) 100%)',
                }}
            />

            {/* Centered brand mark with a pulsing glow behind it */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className={`absolute size-104 rounded-full bg-sky-300/30 blur-3xl ${styles.glow}`}
                />
                <BrandWhiteIcon
                    className={`relative w-[55%] max-w-md text-white drop-shadow-[0_0_40px_oklch(0.8_0.12_262/0.6)] ${styles.icon}`}
                />
            </div>

            {/* Floating voxel blocks */}
            {BLOCKS.map((b, i) => (
                <span
                    key={i}
                    className={`absolute -bottom-16 rounded-[3px] bg-white/15 ring-1 ring-white/40 ${styles.block}`}
                    style={
                        {
                            left: b.left,
                            width: b.size,
                            height: b.size,
                            animationDelay: `${b.delay}s`,
                            '--duration': `${b.duration}s`,
                            '--block-opacity': b.opacity,
                        } as CSSProperties
                    }
                />
            ))}

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,oklch(0.15_0.08_264/0.5)_100%)]" />
        </div>
    );
}
