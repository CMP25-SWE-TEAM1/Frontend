import { render, screen, act } from "@testing-library/react"
import DisplayMedia from "../../components/Home/DisplayMedia"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

describe("DisplayMedia", () => {
  let testImageUrl = ["../../assets/pexels-aphiwat-chuangchoem-358904.jpg"]
  let imageType = ["jpg"]
  const handleDeleteMedia = (url, typeIndex) => {
    testImageUrl = testImageUrl.filter((item) => item !== url)
    imageType = imageType.filter((i, index) => index !== typeIndex)
  }
  test("component renders correctly in compose post", () => {
    render(
      <BrowserRouter>
        <DisplayMedia mediaUrls={testImageUrl} mediaTypes={imageType} handleDeleteMedia={() => handleDeleteMedia(testImageUrl[0], 0)} showCancelButton={true} />
      </BrowserRouter>
    )
    const displayMedia = screen.getByTestId("displayMedia")
    expect(displayMedia).toBeInTheDocument()
    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()
    const cancelButton = screen.getByTestId("showCancelButton")
    expect(cancelButton).toBeInTheDocument()
  })
  test("component renders correctly in post", () => {
    render(
      <BrowserRouter>
        <DisplayMedia mediaUrls={testImageUrl} mediaTypes={imageType} handleDeleteMedia={() => handleDeleteMedia(testImageUrl[0], 0)} showCancelButton={false} />
      </BrowserRouter>
    )
    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()
    const cancelButton = screen.queryByTestId("showCancelButton")
    expect(cancelButton).toBeNull()
  })
  // test("cancel media works",async ()=>{
  //     const {rerender} = render(
  //         <BrowserRouter>
  //         <DisplayMedia mediaUrls={testImageUrl} mediaTypes={imageType} handleDeleteMedia={()=>handleDeleteMedia(testImageUrl[0],0)} showCancelButton={true}/>
  //         </BrowserRouter>
  //     );
  //     const cancelButton = screen.getByTestId('showCancelButton');
  //     const image = screen.getByRole('img');
  //     expect(image).toBeInTheDocument();
  //     await act(() => {
  //         user.click(cancelButton);
  //       });
  //       rerender(
  //         <BrowserRouter>
  //         <DisplayMedia mediaUrls={testImageUrl} mediaTypes={imageType} handleDeleteMedia={handleDeleteMedia} showCancelButton={true}/>
  //         </BrowserRouter>
  //       );
  //     const imageAfterCancel = screen.queryByRole('img');
  //     expect(imageAfterCancel).toBeNull();
  // });
})
