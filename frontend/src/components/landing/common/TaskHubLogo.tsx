
import { cn } from '@/lib/utils'

export const TaskHubLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">TaskHub</span>
        </div>
    )
}
