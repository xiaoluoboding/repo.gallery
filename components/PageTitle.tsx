import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

interface IProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export const PageTitle = ({ title, subtitle, className, ...rest }: IProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <Balancer as="h1" className={className} {...rest}>
        {title}
      </Balancer>
      {subtitle}
    </div>
  )
}
