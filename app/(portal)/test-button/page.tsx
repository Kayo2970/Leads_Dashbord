"use client"

import { ShinyButton } from "@/components/ui/shiny-button";
import { motion } from "framer-motion";

export default function ButtonDemoPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Shiny Button Integration</h1>
        <p className="text-muted-foreground">The premium button component has been added to your UI library.</p>
      </motion.div>

      <div className="flex gap-6">
        <ShinyButton onClick={() => alert("Button clicked!")}>
          Get Unlimited Access
        </ShinyButton>
        
        <ShinyButton className="scale-110" onClick={() => console.log("Second button")}>
          Launch Portal
        </ShinyButton>
      </div>
    </div>
  )
}
