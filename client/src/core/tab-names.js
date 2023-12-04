import { Class } from "../tabs/Class";
import { Project } from "../tabs/Project";
import { Resume } from "../tabs/Resume";
import { Internship } from "../tabs/Internship";
import { Interview } from "../tabs/Interview";
import { Note } from "../tabs/Note";
import { Networking } from "../tabs/Networking";
import { Story } from "../tabs/Story";
import { Faq } from "../tabs/Faq";

export const TAB_NAMES = [
    {tabName: 'Classes', eventKey: 'classes', comp: <Class/>}, 
    {tabName: 'Projects', eventKey: 'projects', comp: <Project/>}, 
    {tabName: 'Resume', eventKey: 'resume', comp: <Resume/>}, 
    {tabName: 'Interview', eventKey: 'interview',  comp: <Interview/>},
    {tabName: 'Internships', eventKey: 'internships', comp: <Internship/>},
    {tabName: 'Forum', eventKey: 'forum', comp: <Note/>}, 
    {tabName: 'Networking', eventKey: 'networking', comp: <Networking/>},
    {tabName: 'Stories', eventKey: 'stories', comp: <Story/>},
    {tabName: 'FAQs', eventKey: 'faqs', comp: <Faq/>}
];
