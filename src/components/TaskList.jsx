import { useState } from 'react'

function TaskList() {
  const [tasks, setTasks] = useState({
    '1.1': false,
    '1.2': false,
    '1.3': false,
    '2.1': false,
    '2.2': false,
    '2.3': false,
    '2.4': false,
    '3.1': false,
    '4.1': false,
    '5.1': false,
    '5.2': false,
    '5.3': false,
    '6.1': false,
    '6.2': false,
    '7.1': false,
    '7.2': false,
    '8.1': false,
    '8.2': false,
    '8.3': false,
    '9.1': false,
    '9.2': false,
    '9.3': false
  })

  const handleTaskChange = (taskId) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskId]: !prevTasks[taskId]
    }))
  }

  return (
    <div className="implementation-plan">
      <div className="phase">
        <h2>Phase 1: Foundational Setup - Lead Magnet & List Building</h2>
        <p className="objective">Objective: Prepare and launch your lead magnet to start building your email list.</p>
        
        <div className="section">
          <h3>1. Lead Magnet Preparation:</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-1-1" 
                checked={tasks['1.1']} 
                onChange={() => handleTaskChange('1.1')} 
              />
              <label htmlFor="task-1-1">Task 1.1: Brand the Lead Magnet:</label>
            </div>
            <ul className="subtasks">
              <li>Add your name/business name.</li>
              <li>Incorporate your logo and branding colors/fonts if applicable.</li>
              <li>Include your website URL and contact information.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-1-2" 
                checked={tasks['1.2']} 
                onChange={() => handleTaskChange('1.2')} 
              />
              <label htmlFor="task-1-2">Task 1.2: Integrate Monetization:</label>
            </div>
            <ul className="subtasks">
              <li>Review content for opportunities to add relevant affiliate links.</li>
              <li>Add links to your own related products or services, if any.</li>
              <li>Ensure all links are functional.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-1-3" 
                checked={tasks['1.3']} 
                onChange={() => handleTaskChange('1.3')} 
              />
              <label htmlFor="task-1-3">Task 1.3: Finalize and Upload:</label>
            </div>
            <ul className="subtasks">
              <li>Convert the edited lead magnet to a PDF document.</li>
              <li>Upload the PDF to a reliable file hosting service (e.g., Google Drive, Dropbox, your website's media library).</li>
              <li>Obtain a direct, shareable download link for the PDF.</li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <h3>2. Squeeze Page Creation & Automation:</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-2-1" 
                checked={tasks['2.1']} 
                onChange={() => handleTaskChange('2.1')} 
              />
              <label htmlFor="task-2-1">Task 2.1: Select and Customize Squeeze Page:</label>
            </div>
            <ul className="subtasks">
              <li>Choose one of the 5 provided squeeze page templates.</li>
              <li>Copy the template content into your page builder (e.g., WordPress, Leadpages, ClickFunnels).</li>
              <li>Customize the page with your branding, compelling headlines, and lead magnet visuals.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-2-2" 
                checked={tasks['2.2']} 
                onChange={() => handleTaskChange('2.2')} 
              />
              <label htmlFor="task-2-2">Task 2.2: Integrate Opt-in Form:</label>
            </div>
            <ul className="subtasks">
              <li>Embed an opt-in form from your email marketing service (e.g., Mailchimp, ConvertKit, AWeber).</li>
              <li>Ensure the form is connected to a specific email list for new subscribers.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-2-3" 
                checked={tasks['2.3']} 
                onChange={() => handleTaskChange('2.3')} 
              />
              <label htmlFor="task-2-3">Task 2.3: Set Up Automated Lead Magnet Delivery:</label>
            </div>
            <ul className="subtasks">
              <li>Configure an automated welcome email in your email marketing service that includes the download link to the lead magnet.</li>
              <li>Alternatively, redirect users to a thank-you page with the download link immediately after opt-in.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-2-4" 
                checked={tasks['2.4']} 
                onChange={() => handleTaskChange('2.4')} 
              />
              <label htmlFor="task-2-4">Task 2.4: Test Squeeze Page Funnel:</label>
            </div>
            <ul className="subtasks">
              <li>Opt-in through your squeeze page as a test user.</li>
              <li>Verify you receive the lead magnet and are added to the correct email list.</li>
              <li>Check for any broken links or errors.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="phase">
        <h2>Phase 2: Content Deployment & Email Automation</h2>
        <p className="objective">Objective: Publish your core content and set up automated email promotion.</p>
        
        <div className="section">
          <h3>3. Publishing Content Pieces (e.g., Blog Posts):</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-3-1" 
                checked={tasks['3.1']} 
                onChange={() => handleTaskChange('3.1')} 
              />
              <label htmlFor="task-3-1">Task 3.1: Prepare and Publish Each of the 25 Content Pieces:</label>
            </div>
            <p className="task-description">For each content piece:</p>
            <ul className="subtasks">
              <li>Review and lightly edit for your unique voice and style (optional, but recommended).</li>
              <li>Add your branding (author name, website).</li>
              <li>Integrate relevant monetization links (affiliate products, your own offers).</li>
              <li>Include a Call-to-Action (CTA) within or at the end of the content, encouraging readers to download your lead magnet (link to your squeeze page).</li>
              <li>Publish the content piece on your blog or chosen platform.</li>
              <li>Note the live URL of each published piece.</li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <h3>4. Setting Up Promotional Email Autoresponder:</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-4-1" 
                checked={tasks['4.1']} 
                onChange={() => handleTaskChange('4.1')} 
              />
              <label htmlFor="task-4-1">Task 4.1: Prepare and Load the 25 Promo Emails:</label>
            </div>
            <p className="task-description">For each of the 25 promotional emails:</p>
            <ul className="subtasks">
              <li>Customize with your branding and a personal touch.</li>
              <li>Insert the direct link to the corresponding published content piece (from Task 3.1).</li>
              <li>Ensure a clear CTA to read the content.</li>
            </ul>
            <ul className="subtasks">
              <li>Load all 25 edited emails into your email marketing service's autoresponder sequence for the list that receives the lead magnet.</li>
              <li>Set the sending schedule (e.g., one email every 2-3 days, or weekly).</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="phase">
        <h2>Phase 3: Social Media Promotion & Audience Growth</h2>
        <p className="objective">Objective: Drive traffic to your squeeze page and content, and build your social media presence.</p>
        
        <div className="section">
          <h3>5. Initial Squeeze Page Promotion (Social Media - 5 Weeks):</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-5-1" 
                checked={tasks['5.1']} 
                onChange={() => handleTaskChange('5.1')} 
              />
              <label htmlFor="task-5-1">Task 5.1: Plan Squeeze Page Promo Captions:</label>
            </div>
            <ul className="subtasks">
              <li>Review the 10 "Social Media Squeeze Page Promo Captions."</li>
              <li>Plan to use 2 captions per week for 5 weeks.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-5-2" 
                checked={tasks['5.2']} 
                onChange={() => handleTaskChange('5.2')} 
              />
              <label htmlFor="task-5-2">Task 5.2: Create Visuals:</label>
            </div>
            <ul className="subtasks">
              <li>For each chosen caption, create a relevant image or short video (AI tools or Canva can assist).</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-5-3" 
                checked={tasks['5.3']} 
                onChange={() => handleTaskChange('5.3')} 
              />
              <label htmlFor="task-5-3">Task 5.3: Schedule/Post:</label>
            </div>
            <ul className="subtasks">
              <li>Post/schedule these 2 captions + visuals per week on your primary social media platforms.</li>
              <li>Crucially, ensure these posts link directly to your squeeze page.</li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <h3>6. Follower Building Campaign (Social Media - Ongoing):</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-6-1" 
                checked={tasks['6.1']} 
                onChange={() => handleTaskChange('6.1')} 
              />
              <label htmlFor="task-6-1">Task 6.1: Prepare Follower Building Content:</label>
            </div>
            <ul className="subtasks">
              <li>Pair each of the 20 "Follower Building Social Media Captions" with its corresponding "Follower Building Social Media Image."</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-6-2" 
                checked={tasks['6.2']} 
                onChange={() => handleTaskChange('6.2')} 
              />
              <label htmlFor="task-6-2">Task 6.2: Schedule/Post Regularly:</label>
            </div>
            <ul className="subtasks">
              <li>Post/schedule this content consistently across your chosen social media networks (e.g., 1-2 per week, or intersperse with other content).</li>
              <li>Use platform-specific CTAs as suggested in the PLR.</li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <h3>7. Extended Content Promotion (Social Media - 25 Weeks):</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-7-1" 
                checked={tasks['7.1']} 
                onChange={() => handleTaskChange('7.1')} 
              />
              <label htmlFor="task-7-1">Task 7.1: Plan Long-Term Content Promotion:</label>
            </div>
            <ul className="subtasks">
              <li>Utilize the 125 "Social Media Traffic Captions" (5 captions per content piece).</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-7-2" 
                checked={tasks['7.2']} 
                onChange={() => handleTaskChange('7.2')} 
              />
              <label htmlFor="task-7-2">Task 7.2: Weekly Promotion Cycle (Repeat for 25 weeks):</label>
            </div>
            <p className="task-description">For each week (focusing on one content piece per week):</p>
            <ul className="subtasks">
              <li>Select the 5 captions for that week's dedicated content piece.</li>
              <li>Create/source 5 accompanying social media images/visuals.</li>
              <li>Schedule/post one caption + image daily (e.g., Monday-Friday), linking directly to that specific content piece on your blog.</li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <h3>8. Leveraging Content Descriptions:</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-8-1" 
                checked={tasks['8.1']} 
                onChange={() => handleTaskChange('8.1')} 
              />
              <label htmlFor="task-8-1">Task 8.1: Enhance Blog Posts:</label>
            </div>
            <ul className="subtasks">
              <li>Use the corresponding "Content Description" as the intro/excerpt for each of your 25 blog posts.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-8-2" 
                checked={tasks['8.2']} 
                onChange={() => handleTaskChange('8.2')} 
              />
              <label htmlFor="task-8-2">Task 8.2: Social Media Snippets:</label>
            </div>
            <ul className="subtasks">
              <li>Post the "Content Descriptions" on platforms like Facebook, LinkedIn, or as Instagram/Facebook story text, linking to the full content piece.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-8-3" 
                checked={tasks['8.3']} 
                onChange={() => handleTaskChange('8.3')} 
              />
              <label htmlFor="task-8-3">Task 8.3: Multimedia Descriptions:</label>
            </div>
            <ul className="subtasks">
              <li>If creating related YouTube videos or podcast episodes, use the descriptions as part of your video/podcast notes.</li>
            </ul>
          </div>
        </div>
        
        <div className="section">
          <h3>9. Short-Form Video Content Strategy (Ongoing):</h3>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-9-1" 
                checked={tasks['9.1']} 
                onChange={() => handleTaskChange('9.1')} 
              />
              <label htmlFor="task-9-1">Task 9.1: Plan Video Content:</label>
            </div>
            <ul className="subtasks">
              <li>Review the 25 "Short Form Video Scripts And Ideas."</li>
              <li>Select a script and one of its 5 video concepts to start.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-9-2" 
                checked={tasks['9.2']} 
                onChange={() => handleTaskChange('9.2')} 
              />
              <label htmlFor="task-9-2">Task 9.2: Create and Post Videos:</label>
            </div>
            <ul className="subtasks">
              <li>Record/create your short video (face-to-camera, voiceover, text-based, etc.).</li>
              <li>Include a clear Hook, Body, and CTA (as per the script).</li>
              <li>Post to platforms like Instagram Reels, TikTok, YouTube Shorts.</li>
              <li>Use video CTAs to promote your blog content, lead magnet, or products.</li>
            </ul>
          </div>
          
          <div className="task">
            <div className="task-header">
              <input 
                type="checkbox" 
                id="task-9-3" 
                checked={tasks['9.3']} 
                onChange={() => handleTaskChange('9.3')} 
              />
              <label htmlFor="task-9-3">Task 9.3: Establish a Schedule:</label>
            </div>
            <ul className="subtasks">
              <li>Aim to produce and post 1-3 short videos per week.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList
