
import { ArrowRight, Bell, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-xl text-gray-700">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Bell className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Email</h4>
                                    <p className="text-gray-700">hello@taskhub.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Support</h4>
                                    <p className="text-gray-700">Available 24/7 for all users</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Sales</h4>
                                    <p className="text-gray-700">sales@taskhub.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="Your name"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="Tell us how we can help..."
                                ></textarea>
                            </div>
                            
                            <Button className="w-full bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors">
                                Send Message
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
