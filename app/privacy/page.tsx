import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Rapsora',
    description: 'We care about your privacy as much as we care about your growth.',
};

export default function PrivacyPage() {
    return (
        <main className="relative pt-40 pb-24 bg-background px-6 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* Sidebar Label */}
                    <div className="w-full lg:w-48 shrink-0">
                        <div className="sticky top-40 flex flex-col gap-4">
                            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">LEGAL.REF.26.04</span>
                            <div className="h-px w-12 bg-primary" />
                            <p className="text-[11px] font-bold text-muted-foreground uppercase leading-relaxed tracking-wider">
                                Last Updated<br/>March 2026
                            </p>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                        <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter text-foreground leading-[0.85] mb-12">
                            Privacy <br/>
                            <span className="italic text-primary">Protocol.</span>
                        </h1>

                        <div className="space-y-16 mt-20">
                            <section className="group p-8 rounded-3xl border border-foreground/[0.03] bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-500">
                                <span className="text-[10px] font-black text-primary/40 mb-4 block">01 / ARCHITECTURE</span>
                                <h2 className="text-2xl font-bold text-foreground mb-4">Diagnostic Data Collection</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    At Rapsora, we respect your data and your digital presence. We only collect information that helps us engineer better results for your brand. Our infrastructure is built to protect your identity with clinical-grade encryption.
                                </p>
                            </section>

                            <section className="group p-8 rounded-3xl border border-foreground/[0.03] bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-500">
                                <span className="text-[10px] font-black text-primary/40 mb-4 block">02 / INTERACTION</span>
                                <h2 className="text-2xl font-bold text-foreground mb-4">Behavioral Intelligence</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We monitor high-intent behavioral patterns on our platform to optimize the world-class experience we provide. We do not sell your data; we use it to build better bridges between brands and their obsessed fans.
                                </p>
                            </section>

                            <section className="group p-8 rounded-3xl border border-foreground/[0.03] bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-500">
                                <span className="text-[10px] font-black text-primary/40 mb-4 block">03 / SOVEREIGNTY</span>
                                <h2 className="text-2xl font-bold text-foreground mb-4">Your Digital Rights</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    You maintain total control over your digital footprint within the Rapsora biosphere. Requesting data deletion or protocol updates is handled with zero friction via our automated support channels.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
