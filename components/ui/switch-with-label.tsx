"use client"

import { Switch } from "@/components/ui/switch"
import {cn} from "@/lib/utils";

interface SwitchWithLabelProps {
    label: string
    checked: boolean
    onChange: (value: boolean) => void
}

export function SwitchWithLabel({ label, checked, onChange }: SwitchWithLabelProps) {
    return (
        <div className="flex items-center gap-3 w-full px-4 py-2">
            <span className="text-base font-medium text-on-surface">{label}</span>
            <Switch checked={checked} onCheckedChange={onChange}
                    className={cn(
                        "data-[state=checked]:bg-primary/20",
                        "data-[state=unchecked]:bg-outline/30",
                        "border border-outline/30",
                        "shadow-sm hover:shadow focus:ring-0 focus:outline-none transition"
                    )}
            />
        </div>
    )
}
