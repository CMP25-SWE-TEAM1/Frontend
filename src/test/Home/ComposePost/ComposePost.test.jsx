import { screen, render ,act} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ComposePost from "../../components/ComposePost";
import user from '@testing-library/user-event';
import axios from "axios";

describe('testing ComposePost component',()=>{
    test('rendering elements correctly',()=>{
      render(<ComposePost />);
      const ComposePostForm = screen.getByRole('form');
      expect(ComposePostForm).toBeInTheDocument();
  
    //   const theDivContainer = screen.getByTitle('buttonNameContainer');
    //   expect(theDivContainer).toBeInTheDocument();
  
    //   const buttonName = screen.getByText('Post');
    //   expect(buttonName).toBeInTheDocument();
    })
    // test("the href is correct",async ()=>{
    //   render(<Button link="/compose/tweet" name="Post"/>);
  
    //   const button = screen.getByRole('link');
    //   expect(button).toHaveAttribute('href', '/compose/tweet');
    // })
  });