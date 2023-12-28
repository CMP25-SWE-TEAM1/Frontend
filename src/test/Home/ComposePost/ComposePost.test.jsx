import { screen, render } from "@testing-library/react";
import ComposePost from "../../../components/Home/ComposePost/ComposePost";
import ComposePostFooter from "../../../components/Home/ComposePost/ComposePostFooter";
import user from '@testing-library/user-event';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../../store"

describe('testing ComposePostFooter component',()=>{
  let uploadMediaClicked=false;
      let handleSubmitClicked=false;
      const handleUploadMediaClick = ()=>{
        uploadMediaClicked=true;
      }
      const handleSubmit = ()=>{
        handleSubmitClicked=true;
      };
    test('rendering ComposePostFooter correctly',()=>{
      render(
        <Provider store={store}>
      <ComposePostFooter buttonName="Post" handleUploadMediaClick={handleUploadMediaClick} mediaDisabled={false} progressCircleSize={24} charsCount={20} charsProgressColor="#1D9BF0" progressCircleValue={10} handleSubmit={handleSubmit}/>
      </Provider>
      );
      const composePostFooter = screen.getByTestId("ComposePostFooter");
      expect(composePostFooter).toBeInTheDocument();
      const media = screen.getByTitle("Media");
      expect(media).toBeInTheDocument();
      const GIF = screen.getByTitle("GIF");
      expect(GIF).toBeInTheDocument();
      const poll = screen.getByTitle("Poll");
      expect(poll).toBeInTheDocument();
      const emoji = screen.getByTitle("Emoji");
      expect(emoji).toBeInTheDocument();
      const schedule = screen.getByTitle("Schedule");
      expect(schedule).toBeInTheDocument();
      const location = screen.getByTitle("Location");
      expect(location).toBeInTheDocument();
      const addIcon = screen.getByTitle("Add");
      expect(addIcon).toBeInTheDocument();
      const postButton = screen.getByText("Post");
      expect(postButton).toBeInTheDocument();
      const circleProgressAddIcon = screen.getByTestId("circleProgress-addIcon");
      expect(circleProgressAddIcon).toBeInTheDocument();
    });
    test('upload media click',async ()=>{
      render(
        <Provider store={store}>
      <ComposePostFooter buttonName="Post" handleUploadMediaClick={handleUploadMediaClick} mediaDisabled={false} progressCircleSize={24} charsCount={20} charsProgressColor="#1D9BF0" progressCircleValue={10} handleSubmit={handleSubmit}/>
      </Provider>
      );
      const media = screen.getByTitle("Media");
      await user.click(media);
      expect(uploadMediaClicked).toBeTruthy();
    });
    test('Post button click',async ()=>{
      render(
        <Provider store={store}>
      <ComposePostFooter buttonName="Post" handleUploadMediaClick={handleUploadMediaClick} mediaDisabled={false} progressCircleSize={24} charsCount={20} charsProgressColor="#1D9BF0" progressCircleValue={10} handleSubmit={handleSubmit}/>
      </Provider>
      );
      const postButton = screen.getByText("Post");
      await  user.click(postButton);
      expect(handleSubmitClicked).toBeTruthy();
    });
  });

  describe('testing ComposePost component',()=>{
    test('rendering ComposePost correctly',()=>{
      <BrowserRouter>
      <Provider store={store}>
      <ComposePost buttonName="Post" postType="tweet"/>
      </Provider>
      </BrowserRouter>
      const profileImage = screen.getByTestId("profileImage");
      expect(profileImage).toBeInTheDocument();
      const description = screen.getById("description");
      expect(description).toBeInTheDocument();
      description.value="post text";
      expect(description).toHaveValue("post text");
      const replyPermissionButton = screen.getByTestId("replyPermission");
      expect(replyPermissionButton).toBeInTheDocument();
    });
  });
