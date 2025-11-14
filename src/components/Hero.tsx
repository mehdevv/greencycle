import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { InteractiveBackground } from "./InteractiveBackground";
import { RecyclingCan3D } from "./RecyclingCan3D";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      <InteractiveBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12 h-full w-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full h-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-emerald-700 tracking-wide uppercase text-xs">Algeria's Recycling Revolution</span>
            </motion.div>

            <div className="space-y-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tighter leading-tight">
                Turn Bottles
                <span className="block text-emerald-600">
                  Into Rewards
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed tracking-wide">
                A sophisticated ecosystem connecting citizens, retailers, and recycling centers to build a sustainable Algeria.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-200">
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl text-slate-900 tracking-tight font-medium">15K+</div>
                <div className="text-slate-500 tracking-wide uppercase text-xs">Active Users <span className="text-slate-400">(est.)</span></div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl text-slate-900 tracking-tight font-medium">500+</div>
                <div className="text-slate-500 tracking-wide uppercase text-xs">Partner Shops <span className="text-slate-400">(est.)</span></div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl text-slate-900 tracking-tight font-medium">2M+</div>
                <div className="text-slate-500 tracking-wide uppercase text-xs">Bottles Recycled <span className="text-slate-400">(est.)</span></div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - 3D Can */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-full w-full"
            style={{ marginLeft: '2rem', paddingRight: '2rem' }}
          >
            <div className="relative w-full h-full flex items-center justify-center" style={{ height: '100%', maxHeight: '95vh', minHeight: '700px' }}>
              <RecyclingCan3D size={850} autoRotate={true} rotationSpeed={0.5} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}