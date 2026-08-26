"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, Clock3, Droplets, Home, Hammer, Phone, Ruler, ShieldCheck, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  ["Planning & Execution", "From early concepts to final handover, every phase is coordinated with purpose.", Ruler],
  ["Kitchen & Bathroom", "Functional renovations with considered layouts, durable materials, and precise finishes.", Home],
  ["Basement Renovation", "Turn underused space into a comfortable, useful extension of your property.", Hammer],
  ["Extensions & General Renovation", "Build more room and improve the spaces you already have, for home or business.", Building2],
  ["Interior Design", "Practical design direction that brings your project, materials, and finishes together.", Wrench],
  ["Emergency & Water Damage", "Responsive construction and restoration support when the unexpected happens.", Droplets],
] as const;
const values = ["Professional project management", "One team from planning to completion", "Solutions for commercial, industrial, and residential spaces", "Clear communication and quality-focused execution"];

export default function HomePage() {
  return <main className="overflow-hidden bg-[#f4f5f7] text-[#252525]">
    <section className="relative min-h-[720px] bg-[#071a33] text-white">
      <Image src="/icestudios.png" alt="Architectural construction detail" fill priority className="object-cover opacity-35" sizes="100vw" />
      <div className="absolute inset-0 bg-[#071a33]/75" />
      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 pb-20 pt-32 lg:px-10"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-4xl">
        <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a23a]"><span className="h-px w-10 bg-[#c9a23a]" /> Building with purpose</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-tight sm:text-7xl">Building today.<br /><span className="text-[#c9a23a]">For a stronger tomorrow.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200">BuildWell Construction delivers reliable construction, renovation, design, and project management solutions for commercial, industrial, and residential clients across Toronto and Ontario.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button asChild size="lg" className="rounded-none bg-[#c9a23a] px-7 text-[#071a33] hover:bg-[#dfbb57]"><Link href="/contact">Get a free quote <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-white/60 bg-transparent px-7 text-white hover:bg-white hover:text-[#071a33]"><Link href="/services">Explore our services</Link></Button></div>
      </motion.div></div>
      <div className="absolute bottom-0 left-0 right-0 grid border-t border-white/15 bg-[#071a33]/80 sm:grid-cols-3">{[[ShieldCheck, "Quality craftsmanship"], [Clock3, "End-to-end management"], [Building2, "Commercial · Industrial · Residential"]].map(([Icon, title]) => <div key={title as string} className="flex items-center gap-3 border-b border-white/10 px-6 py-5 text-sm font-medium sm:border-b-0 sm:border-r sm:px-10"><Icon className="h-5 w-5 text-[#c9a23a]" />{title}</div>)}</div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:px-10"><div><p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a23a]">The BuildWell approach</p><h2 className="max-w-lg text-4xl font-semibold leading-tight text-[#071a33] sm:text-5xl">Strong spaces start with thoughtful planning.</h2></div><div className="space-y-6 text-lg leading-8 text-slate-600"><p>Successful construction is about more than putting materials together. It is about creating spaces that serve a purpose, withstand everyday demands, and provide long-term value.</p><p>We combine practical design, careful planning, quality workmanship, and professional coordination to help move your project from concept to completion.</p><Link href="/about" className="inline-flex items-center font-semibold text-[#071a33] hover:text-[#c9a23a]">Meet BuildWell <ChevronRight className="ml-1 h-4 w-4" /></Link></div></section>

    <section className="bg-white px-6 py-24 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a23a]">What we do</p><h2 className="text-4xl font-semibold text-[#071a33]">Construction made comprehensive.</h2></div><Link href="/services" className="inline-flex items-center font-semibold text-[#071a33]">All services <ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">{services.map(([title, text, Icon], index) => <motion.div whileHover={{ y: -5 }} key={title} className="bg-white p-8"><div className="mb-14 flex items-center justify-between"><Icon className="h-8 w-8 text-[#c9a23a]" /><span className="text-sm text-slate-400">0{index + 1}</span></div><h3 className="mb-3 text-xl font-semibold text-[#071a33]">{title}</h3><p className="leading-7 text-slate-600">{text}</p></motion.div>)}</div></div></section>

    <section className="bg-[#071a33] px-6 py-24 text-white lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a23a]">Why BuildWell</p><h2 className="text-4xl font-semibold leading-tight sm:text-5xl">A better build begins with a better process.</h2></div><div className="grid gap-7 sm:grid-cols-2">{values.map((value, index) => <div key={value} className="border-t border-white/20 pt-5"><span className="text-sm text-[#c9a23a]">0{index + 1}</span><p className="mt-3 text-lg leading-7 text-slate-200">{value}</p></div>)}</div></div></section>

    <section className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.1fr_.9fr] lg:px-10"><div><p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a23a]">Project showcase</p><h2 className="text-4xl font-semibold text-[#071a33] sm:text-5xl">See what we can build together.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">We are building our BuildWell portfolio. Explore the services behind our work, then talk to us about the space you want to create.</p><Button asChild className="mt-8 rounded-none bg-[#071a33] hover:bg-[#c9a23a] hover:text-[#071a33]"><Link href="/contact">Start a conversation <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div><div className="relative min-h-[320px]"><Image src="/cabinetinstallation.png" alt="Detailed interior construction work" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" /><div className="absolute bottom-0 left-0 bg-[#c9a23a] px-5 py-4 text-sm font-bold uppercase tracking-wider text-[#071a33]">Designed for how you live and work</div></div></section>

    <section className="bg-[#c9a23a] px-6 py-16 text-[#071a33] lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em]">Ready to build something better?</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Let&apos;s talk about your project.</h2></div><div className="flex flex-col gap-3 sm:items-end"><Button asChild size="lg" className="rounded-none bg-[#071a33] text-white hover:bg-white hover:text-[#071a33]"><Link href="/contact">Request a consultation <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><a href="tel:+14376881994" className="inline-flex items-center justify-center gap-2 font-semibold"><Phone className="h-4 w-4" /> (437) 688-1994</a></div></div></section>
  </main>;
}
