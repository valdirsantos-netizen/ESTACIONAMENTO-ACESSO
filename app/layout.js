export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#f0f2f5' }}>
        {children}
      </body>
    </html>
  )
}
