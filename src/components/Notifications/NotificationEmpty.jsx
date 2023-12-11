const NotificationEmpty = () => {
    return (
      <div className="mt-10 flex flex-col items-center">
        <div className="flex max-w-[360px] flex-col items-center justify-center">
          <div className="text-3xl font-bold">Nothing to see here — yet</div>
          <div className="mt-2 text-sm text-secondary">
            Likes, mentions, reposts, and a whole lot more — when it comes from a verified account, you`ll find it here.{" "}
            <a href="https://help.twitter.com/en/managing-your-account/about-x-verified-accounts" target="_blank" className="text-black hover:underline dark:text-white" rel="noreferrer">
              Learn more
            </a>
          </div>
        </div>
      </div>
    )
}
 
export default NotificationEmpty;