import NotificationEmpty from "./NotificationEmpty"

const VerifiedEmpty = () => {
  return (
    <div className="mt-16 flex flex-col items-center">
      <div className="flex justify-center">
        <img className="max-w-[360px]" src="https://abs.twimg.com/responsive-web/client-web/verification-check-800x400.v1.52677a99.png" alt="nothing" />
      </div>
      <NotificationEmpty />
    </div>
  )
}

export default VerifiedEmpty
