
import { CheckCircle } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            About TaskHub
                        </h2>
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                            TaskHub was built by a team of productivity enthusiasts who understand the challenges of modern project management. We've experienced firsthand how scattered tools and poor communication can derail even the best teams.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Our mission is simple: to create a unified platform where teams can collaborate effectively, track progress transparently, and deliver exceptional results consistently.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                                <div className="text-gray-700">Active Teams</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                                <div className="text-gray-700">Projects Completed</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:pl-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose TaskHub?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <span className="text-gray-700">Intuitive interface that requires no training</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <span className="text-gray-700">Real-time collaboration and updates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <span className="text-gray-700">Powerful analytics and reporting</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <span className="text-gray-700">Enterprise-grade security</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
