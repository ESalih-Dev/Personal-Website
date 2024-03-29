import { ReactNode, useState } from 'react'
import { Link } from '@remix-run/react'
import { Button } from '@components/button'
import { Separator } from '@components/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/tooltip'
import {
  CheckIcon,
  CopyIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  LucideIcon,
  MailIcon,
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@components/popover'
import { PopoverAnchor } from '@radix-ui/react-popover'
import { ClientOnly } from '~/components/ClientOnly'

interface Social {
  friendlyName: string
  Icon: LucideIcon
  colour: string
  url?: string
}

const SOCIALS: Social[] = [
  {
    friendlyName: 'Instagram',
    Icon: InstagramIcon,
    colour: '#E1306C',
    url: 'https://www.instagram.com/kin_sal_/',
  },
  {
    friendlyName: 'LinkedIn',
    Icon: LinkedinIcon,
    colour: '#0077B5',
    url: 'https://www.linkedin.com/in/kin-salih/',
  },
  {
    friendlyName: 'GitHub',
    Icon: GithubIcon,
    colour: '#171515',
    url: 'https://github.com/ESalih-Dev',
  },
]

const TooltipWrapper = ({
  text,
  children,
  defaultOpen = false,
}: {
  text: string
  children: ReactNode
  defaultOpen?: boolean
}) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const SocialButton = ({ Icon, colour, url }: Omit<Social, 'friendlyName'>) => {
  const [hovering, setHovering] = useState(false)

  const flipHoveringState = () => setHovering(!hovering)

  const iconComponent = (
    <Icon
      className="h-14 w-14 transition-colors duration-500"
      {...(hovering && { color: colour })}
    />
  )

  return (
    <div
      key={url}
      className="flex items-center justify-center"
      onMouseEnter={flipHoveringState}
      onMouseLeave={flipHoveringState}
    >
      {url ? (
        <Link to={url} target="_blank" rel="noopener noreferrer">
          {iconComponent}
        </Link>
      ) : (
        iconComponent
      )}
    </div>
  )
}

const EmailPopover = ({
  email,
  children,
}: {
  email: string
  children: ReactNode
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    var range = document.createRange()
    range.selectNode(document.getElementById('email')!)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
    document.execCommand('copy')
    window.getSelection()?.removeAllRanges()
    setCopied(true)
  }

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className="w-fit"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
        onCloseAutoFocus={() => {
          setCopied(false)
        }}
      >
        <div className="flex flex-row align-middle">
          <div id="email" className="mr-6">
            {email}
          </div>
          {copied ? (
            <TooltipWrapper defaultOpen text="Copied!">
              <CheckIcon color="green" className="h-6 w-6" />
            </TooltipWrapper>
          ) : (
            <CopyIcon
              className="h-6 w-6 cursor-pointer"
              onClick={copyToClipboard}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const Socials = () => (
  <div className="flex justify-center">
    {SOCIALS.map((social) => (
      <div key={social.friendlyName} className="flex flex-row">
        <TooltipWrapper text={social.friendlyName}>
          <SocialButton {...social} />
        </TooltipWrapper>
        <Separator className="mx-3 h-auto md:mx-8" orientation="vertical" />
      </div>
    ))}
    <EmailPopover email="erkin_salih@hotmail.com">
      <ClientOnly>
        {() => (
          <TooltipWrapper text="Email">
            <SocialButton Icon={MailIcon} colour="#FFC629" />
          </TooltipWrapper>
        )}
      </ClientOnly>
    </EmailPopover>
  </div>
)
