export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div data-theme="buzz">{children}</div>
}
