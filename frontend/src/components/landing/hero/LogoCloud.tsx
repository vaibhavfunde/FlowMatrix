
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export const LogoCloud = () => {
    const trustedBrands = [
        "TechCorp", "InnovateLabs", "StartupXYZ", "CreativeAgency", "DataSolutions", "CloudTech"
    ];

    return (
        <section className="bg-background pb-16 md:pb-32">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm text-gray-600">Trusted by teams at</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            {trustedBrands.map((brand, index) => (
                                <div key={index} className="flex">
                                    <div className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                        {brand}
                                    </div>
                                </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
