import Image from "next/image";
import NotionRenderer from "./NotionRenderer";
import { useConfig } from "@/lib/config";

const Hero = ({ blockMap, emailHash }) => {
  const BLOG = useConfig()
  console.log(BLOG)

  return (
    <>
      <div className='container mx-auto flex px-2 py-2 mb-12 md:flex-row flex-col items-center'>
        <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left'>
          <NotionRenderer
            className="md:ml-0"
            recordMap={blockMap}
            frontMatter={{}}
            subPageTitle={null}
            />
        </div>
        <div className="md:w-2/5 mx-3">
          <Image
            alt={BLOG.author}
            width={500}
            height={500}
            src={`https://gravatar.com/avatar/${emailHash}`}
            className="rounded-full"
          />
        </div>
      </div>
    </>
  )
}

export default Hero
