import { Icon, IconT, Notification } from '@mozilla/lilypad-ui'

const ContactModal = () => {
  type ContactLinkT = {
    icon: IconT
    href: string
    label: string
  }

  const data: ContactLinkT[] = [
    {
      icon: 'linkedin',
      href: 'https://www.linkedin.com/in/nick-grato-94598793/',
      label: 'LinkedIn',
    },
    {
      icon: 'mail',
      href: 'mailto:ngrato@gmail.com',
      label: 'Email',
    },
    {
      icon: 'github',
      href: 'https://github.com/nickgrato',
      label: 'GitHub',
    },
  ]

  return (
    <>
      {/* HEADER  */}
      <div className="mb-12">
        <h2 className="heading-lg">Contact</h2>
      </div>

      {/* MODAL CONTENTS  */}
      <div className="p-8 gap-12 flex-column">
        <p className="body-md">Feel free to send me a message:</p>

        {data.map(({ icon, href, label }) => (
          <div className="flex-align-center mb-12" key={label}>
            <Icon name={icon} className="mr-12" />
            <a
              href={href}
              className="primary-link"
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default ContactModal
