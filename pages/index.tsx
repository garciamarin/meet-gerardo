import type { NextPage } from 'next'
import { request } from "../lib/datocms";
import Head from 'next/head'
import Image from 'next/image'

const HOMEPAGE_QUERY = `{
  home {
    id
    mainTitle
    title
    backgroundImage {
      id
      blurUpThumb
      url
    }
  }
}`;

type HomePageQuery = {
  home: {
    id: string
    mainTitle: string | null
    title: string | null
    backgroundImage: {
      id : string
      blurUpThimb : string
      url : string
    }
  }
}

type PageProps = {
  content: HomePageQuery
}

export async function getStaticProps<PageProps>() {
  const HomeContent = await request({
    query: HOMEPAGE_QUERY,
  });
  
  return {
    props: { HomeContent }
  };
}
export default function Home ( props:  {HomeContent:HomePageQuery}  ) {

  const content = props.HomeContent.home

  return (
    <section className='bg-black text-center p-32'>
      <div className={'mx-auto'}>
        <span className='text-8xl text-teal-500 font-bold'>{content && content.mainTitle }</span>
      </div>
      <div>
        <span className='text-5xl text-teal-800 font-medium '>
          {content && content.title}
        </span>
      </div>
      <img src={content.backgroundImage.url} className='w-1/3 mx-auto m-12'/>
    </section>

  )
}