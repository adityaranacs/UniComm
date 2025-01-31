export const mockEmails = {
    inbox: [
      {
        _id: "1",
        senderId: "user2",
        senderName: "John Doe",
        senderEmail: "john.doe@example.com",
        senderProfilePic: "/avatar.png",
        subject: "Project Update Meeting",
        text: "Hi team, I wanted to schedule a meeting to discuss the latest project updates. We need to finalize the milestones and ensure everything is on track. Are you available tomorrow at 2 PM? Let me know your availability so we can coordinate accordingly.",
        createdAt: "2025-01-30T10:00:00.000Z",
        isRead: false,
        folder: "inbox",
        hasAttachments: false
      },
      {
        _id: "2",
        senderId: "user3",
        senderName: "Sarah Wilson",
        senderEmail: "sarah.w@example.com",
        senderProfilePic: "/avatar.png",
        subject: "Design Review",
        text: "Please review the attached design mockups for the new feature. I've incorporated the feedback from our last meeting, including the UI enhancements and accessibility improvements. Let me know if there are any final tweaks you'd like before we move forward with development.",
        createdAt: "2025-01-30T09:30:00.000Z",
        isRead: true,
        folder: "inbox",
        hasAttachments: true,
        attachments: [
          {
            name: "design-mockups.pdf",
            url: "/mock-designs.pdf"
          }
        ]
      },
      {
        _id: "3",
        senderId: "user4",
        senderName: "Mike Johnson",
        senderEmail: "mike.j@example.com",
        senderProfilePic: "/avatar.png",
        subject: "Weekly Report",
        text: "Attached is the weekly progress report for our ongoing projects. Please review the key performance indicators, completed tasks, and pending issues. Let me know if you need any clarification or additional insights. Your feedback would be appreciated before we submit the final report.",
        createdAt: "2025-01-29T15:45:00.000Z",
        isRead: true,
        folder: "inbox",
        hasAttachments: true,
        attachments: [
          {
            name: "weekly-report.pdf",
            url: "/mock-pdf.pdf"
          }
        ]
      },
      {
        _id: "4",
        senderId: "user5",
        senderName: "Emily Carter",
        senderEmail: "emily.c@example.com",
        senderProfilePic: "/avatar.png",
        subject: "Team Outing This Friday",
        text: "Hey everyone, we’re planning a team outing this Friday evening. It’s been a while since we had a casual get-together, and this would be a great chance to unwind. Please confirm your availability so we can make the necessary arrangements. Hope to see you all there!",
        createdAt: "2025-01-28T18:20:00.000Z",
        isRead: false,
        folder: "inbox",
        hasAttachments: false
      },
      {
        _id: "5",
        senderId: "user6",
        senderName: "David Smith",
        senderEmail: "david.s@example.com",
        senderProfilePic: "/avatar.png",
        subject: "Security Policy Updates",
        text: "Hello Team, Please take a moment to review the attached document regarding the recent updates to our security policies. These changes will be effective starting next month. Let me know if you have any concerns or questions. Your cooperation is highly appreciated.",
        createdAt: "2025-01-27T14:10:00.000Z",
        isRead: true,
        folder: "inbox",
        hasAttachments: true,
        attachments: [
          {
            name: "security-policy.pdf",
            url: "/mock-security-policy.pdf"
          }
        ]
      }
    ],
    sent: [
      {
        _id: "6",
        senderId: "user1", // current user
        recipientName: "Alex Brown",
        recipientEmail: "alex.b@example.com",
        recipientProfilePic: "/avatar.png",
        subject: "Re: Client Meeting",
        text: "That works for me. I'll prepare the presentation slides and share them before the meeting. Please let me know if there's anything specific you’d like me to cover. Looking forward to discussing the next steps with everyone.",
        createdAt: "2025-01-30T11:15:00.000Z",
        folder: "sent",
        hasAttachments: false
      },
      {
        _id: "7",
        senderId: "user1",
        recipientName: "Jessica Adams",
        recipientEmail: "jessica.a@example.com",
        recipientProfilePic: "/avatar.png",
        subject: "Proposal for New Project",
        text: "Hi Jessica, I’ve attached the project proposal document with all the details, including the scope, timeline, and budget estimates. Let me know your thoughts, and we can schedule a follow-up call to discuss any modifications.",
        createdAt: "2025-01-29T16:00:00.000Z",
        folder: "sent",
        hasAttachments: true,
        attachments: [
          {
            name: "project-proposal.pdf",
            url: "/mock-project-proposal.pdf"
          }
        ]
      },
      {
        _id: "8",
        senderId: "user1",
        recipientName: "Michael Lee",
        recipientEmail: "michael.l@example.com",
        recipientProfilePic: "/avatar.png",
        subject: "Follow-up on Training Session",
        text: "Hey Michael, I hope you found the training session helpful. As discussed, I’m sharing the documentation and tutorial links. If you have any questions or need further clarification, feel free to reach out.",
        createdAt: "2025-01-28T12:45:00.000Z",
        folder: "sent",
        hasAttachments: true,
        attachments: [
          {
            name: "training-resources.zip",
            url: "/mock-training.zip"
          }
        ]
      }
    ]
  };
  
  export const folders = [
    {
      id: "inbox",
      label: "Inbox",
      count: mockEmails.inbox.length,
      icon: "Inbox"
    },
    {
      id: "sent",
      label: "Sent",
      count: mockEmails.sent.length,
      icon: "Send"
    }
  ];
  