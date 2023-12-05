import Script from 'next/script'
import { useConfig } from '@/lib/config'

const Scripts = () => {
  const BLOG = useConfig()

  return (
    <>
      {BLOG.analytics && BLOG.analytics.provider?.indexOf('ackee') >= 0 && (
        <Script
          src={BLOG.analytics.ackeeConfig.tracker}
          data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
          data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
        />
      )}
      {BLOG.analytics && BLOG.analytics.provider.indexOf('umami') >= 0 && (
        <Script
          async
          defer
          data-website-id={BLOG.analytics.umamiConfig.websiteId}
          src={BLOG.analytics.umamiConfig.src}
        />
      )}
      {BLOG.analytics && BLOG.analytics.provider.indexOf('ga') >= 0 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
          />
          <Script strategy="lazyOnload" id="ga">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
                page_path: window.location.pathname,
              });`}
          </Script>
        </>
      )}
    </>
  )
}

export default Scripts
