import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { InteractiveBackground } from "./InteractiveBackground";
import { RecyclingCan3D } from "./RecyclingCan3D";
import styles from "./Hero.module.css";
import { useState, useEffect } from "react";

export function Hero() {
  const [canSize, setCanSize] = useState(850);

  useEffect(() => {
    const updateCanSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setCanSize(280);
      } else if (width <= 640) {
        setCanSize(350);
      } else if (width <= 768) {
        setCanSize(450);
      } else if (width <= 1024) {
        setCanSize(600);
      } else {
        setCanSize(850);
      }
    };

    updateCanSize();
    window.addEventListener('resize', updateCanSize);
    return () => window.removeEventListener('resize', updateCanSize);
  }, []);

  return (
    <section className={styles.heroSection}>
      <InteractiveBackground />
      
      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.heroBadge}
            >
              <div className={styles.heroBadgeDot} />
              <span className={styles.heroBadgeText}>Algeria's Recycling Revolution</span>
            </motion.div>

            <div className={styles.heroHeadingContainer}>
              <h1 className={styles.heroHeading}>
                <span className={styles.heroHeadingLine1}>Turn Bottles</span>
                <span className={styles.heroHeadingHighlight}>
                  Into Rewards
                </span>
              </h1>
              <p className={styles.heroDescription}>
                A sophisticated ecosystem connecting citizens, retailers, and recycling centers to build a sustainable Algeria.
              </p>
            </div>

            <div className={styles.heroButtons}>
              <Button
                size="default"
                className="bg-emerald-600 hover:bg-emerald-700 text-white group px-6 py-5 tracking-wide text-sm"
              >
                Start Recycling
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-5 tracking-wide text-sm"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className={styles.heroStats}>
              <div className="space-y-1">
                <div className={styles.heroStatValue}>15K+</div>
                <div className={styles.heroStatLabel}>Active Users <span className="text-slate-400">(est.)</span></div>
              </div>
              <div className="space-y-1">
                <div className={styles.heroStatValue}>500+</div>
                <div className={styles.heroStatLabel}>Partner Shops <span className="text-slate-400">(est.)</span></div>
              </div>
              <div className="space-y-1">
                <div className={styles.heroStatValue}>2M+</div>
                <div className={styles.heroStatLabel}>Bottles Recycled <span className="text-slate-400">(est.)</span></div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - 3D Can */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.hero3DContainer}
          >
            <div className={styles.hero3DWrapper}>
              <RecyclingCan3D size={canSize} autoRotate={true} rotationSpeed={0.5} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}