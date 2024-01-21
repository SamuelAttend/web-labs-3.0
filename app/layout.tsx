import './globals.css'
import NavbarComponent from './components/navbar'
import CatalogComponent from './components/catalog'
import * as dotenv from 'dotenv'
import SearchContextProvider from './contexts/searchContext'
import PageContextProvider from './contexts/pageContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  dotenv.config()

  return (
    <html lang="en">
      <body className='bg-[#7149C6]'>
        <PageContextProvider>
          <SearchContextProvider>
            <NavbarComponent>
              <CatalogComponent />
            </NavbarComponent>
            {children}
          </SearchContextProvider>
        </PageContextProvider>
      </body>
    </html >
  )
}