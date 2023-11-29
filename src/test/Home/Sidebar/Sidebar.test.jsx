import { screen, render} from "@testing-library/react";
import Sidebar from "../../../components/Sidebar/Sidebar";

describe('testing Sidebar component',()=>{
    test('rendering elements correctly',()=>{
        render(<Sidebar />);

        const gigaChatIcon = screen.getByAltText("gigaChatIcon");
        expect(gigaChatIcon).toBeInTheDocument();

        const sidebarOptions = screen.getAllByAltText("sidebarOption");
        expect(sidebarOptions.length).toBe("9"); 

        const postButton = screen.getByAltText("post");
        expect(postButton).toBeInTheDocument();

        const switchAccountButton = screen.getByAltText("switchAccount");
        expect(switchAccountButton).toBeInTheDocument();                   
  });
});