import { motion } from "motion/react";
import { ArrowRight, Smartphone, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import styles from "./CTASection.module.css";

export function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.ctaCard}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.ctaBadge}
          >
            <div className={styles.ctaBadgeDot} />
            <span className={styles.ctaBadgeText}>Join 15,000+ Active Users <span className="text-emerald-600">(est.)</span></span>
          </motion.div>

          {/* Heading */}
          <div className={styles.ctaHeadingContainer}>
            <h2 className={styles.ctaHeading}>
              Ready to Make a
              <span className={styles.ctaHeadingHighlight}>
                Real Difference?
              </span>
            </h2>
            <p className={styles.ctaDescription}>
              Start earning rewards while helping build a sustainable future for Algeria. Download the app or visit a partner shop today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <Button
              size="lg"
              className={`bg-emerald-600 hover:bg-emerald-700 text-white tracking-wide ${styles.ctaButton}`}
            >
              <Smartphone className={`${styles.ctaButtonIcon}`} />
              Download App
              <ArrowRight className={`ml-2 ${styles.ctaButtonIcon}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`border-slate-300 text-slate-700 hover:bg-slate-50 tracking-wide ${styles.ctaButton}`}
            >
              <Globe className={`${styles.ctaButtonIcon}`} />
              Find Partner Shops
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={styles.ctaTrustIndicators}>
            <div className="space-y-2">
              <div className={styles.ctaTrustValue}>100%</div>
              <div className={styles.ctaTrustLabel}>Free to Use</div>
            </div>
            <div className="space-y-2">
              <div className={styles.ctaTrustValue}>500+</div>
              <div className={styles.ctaTrustLabel}>Partner Locations <span className="text-slate-400">(est.)</span></div>
            </div>
            <div className="space-y-2">
              <div className={styles.ctaTrustValue}>24/7</div>
              <div className={styles.ctaTrustLabel}>Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}