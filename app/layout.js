export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
