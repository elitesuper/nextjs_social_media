import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Select } from '@/components/Select'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { platforms, languages, variants, tones } from '@/lib/caption-sizes'

import { useState } from 'react'
import { sizes } from '@/lib/caption-sizes'



function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function CaptionOutput({ captionText}) {

  function handleCopy(event) {
    event.preventDefault()
    navigator.clipboard.writeText(captionText);
  }
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span>Output</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <textarea
          id="caption"
          value={captionText}
          rows={5}
          readOnly={true}
          className="w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          placeholder="Inspiring community members to share their voices and ideas openly."
        />
      </div>
      <div className="mt-6">
        <Button onClick={handleCopy} className="w-full flex-none">
          Copy
        </Button>
      </div>
    </form>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Planetaria',
      title: 'CEO',
      logo: logoPlanetaria,
      start: '2019',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Airbnb',
      title: 'Product Designer',
      logo: logoAirbnb,
      start: '2014',
      end: '2019',
    },
    {
      company: 'Facebook',
      title: 'iOS Software Engineer',
      logo: logoFacebook,
      start: '2011',
      end: '2014',
    },
    {
      company: 'Starbucks',
      title: 'Shift Supervisor',
      logo: logoStarbucks,
      start: '2008',
      end: '2011',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${role.end.label ?? role.end
                  }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles }) {


  const [loading, setLoading] = useState(false);
  const [captionText, setCaptionText] = useState("");
  // forms
  const [languageInput, setLanguage] = useState(languages[0]);
  const [platformInput, setPlatform] = useState(platforms[0]);
  const [topicInput, setTopic] = useState("Avoiding toxic relationships for your health.");
  const [variantInput, setVariant] = useState(variants[0]);
  const [toneInput, setTone] = useState(tones[0]);
  const [sizeInput, setSize] = useState(sizes[0]);

  const [webUrlInput, setWebUrl] = useState("");
  const [socialUrlInput, setSocialUrl] = useState("");

  async function onSubmitCaption(event) {
    setLoading(true);
    event.preventDefault();
    var reqPost = JSON.stringify({
      languageInputId : languageInput.id,
      platformInputId: platformInput.id,
      variantInputId: variantInput.id,
      toneInputId:toneInput.id,
      topicInput,
      webUrlInput,
      socialUrlInput,
      sizeInputId: sizeInput.id,
    });
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_EXPRESS_API_URL+'/caption/generate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: reqPost,
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log('from server');
      setCaptionText(data.result);

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
      <Head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <title>
          AI Caption Generator
        </title>
        <meta
          name="description"
          content="We invest in the world’s potential"
        />
      </Head>
      <Container className="mt-9">
        <div className="w-full">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl text-center">
            This is AI Caption Generator
          </h1>
          <div className='w-full mt-6'>
            <div className='max-w-2xl mx-auto'>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center">
                AI Caption Generator is a tool that uses artificial intelligence to automatically generate captions or descriptions for images. 
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-20 md:mt-20">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <form className='rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40' onSubmit={onSubmitCaption}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select language</label>
                  <Select data={languages} onChange={(e) => setLanguage(e)}></Select>
                </div>
                <div>
                  <label htmlFor="context" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Select platform</label>
                  <Select data={platforms} onChange={(e) => setPlatform(e)}></Select>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Post topic</label>
                <textarea
                  value={topicInput}
                  id="topic"
                  rows={4}
                  className="w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                  placeholder="Inspiring community members to share their voices and ideas openly."
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caption Length</label>
                  <Select data={sizes} onChange={(e) => setSize(e)}></Select>
                </div>
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="variant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Variations</label>
                  <Select data={variants} onChange={(e) => setVariant(e)}></Select>
                </div>
                <div>
                  <label htmlFor="tone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select writing style</label>
                  <Select data={tones} onChange={(e) => setTone(e)}></Select>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="webUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                <input
                  type="url"
                  id="webUrl"
                  className="w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                  placeholder="Enter website URL"
                  value={webUrlInput}
                  onChange={(e) => setWebUrl(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="socialUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social media URL</label>
                <input
                  type="url"
                  id="socialUrl"
                  className="w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                  placeholder="Enter social media URL"
                  value={socialUrlInput}
                  onChange={(e) => setSocialUrl(e.target.value)}
                />
              </div>
              <div className="mb-6 w-full text-center">
                <Button type="submit" className="w-full max-w-md mt-4" disabled={loading}>
                  { loading ? 'Loading..' : 'Generate Captions' }
                </Button>
              </div>
            </form>
          </div>
          <div className="space-y-10 lg:pl-8 xl:pl-12">
            <CaptionOutput captionText={captionText} />
            {/* <Resume /> */}
          </div>
        </div>
      </Container>
    </>
  )
}
export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
