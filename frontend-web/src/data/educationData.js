/**
 * REVENT frontend-only educational examples.
 * Replace these with reviewed database content when the backend is ready.
 * None of the items below represents a live scam alert.
 */
export const scamTopics = [
  {
    id: 'fake-bank-officer',
    title: 'Fake Bank Officer',
    category: 'Impersonation',
    categoryCode: 'BANK',
    icon: 'landmark',
    minutes: 3,
    difficulty: 'Beginner',
    summary: 'Someone pretends to be from your bank and pressures you to reveal details or move money.',
    introduction: 'A scammer may claim to be a bank employee, insist that your account is at risk, and ask you to share sensitive details or transfer funds to a so-called safe account.',
    unfolds: [
      'You receive a call or message claiming there is suspicious activity on your account.',
      'The caller creates urgency and may sound professional or know some of your details.',
      'You are told to share a one-time password, login details or transfer funds to protect your money.'
    ],
    redFlags: [
      'The caller asks for your OTP, PIN or password.',
      'You are told to transfer funds into a “safe account”.',
      'The caller threatens to freeze your account if you do not act immediately.',
      'You are discouraged from ending the call or checking independently.'
    ],
    verify: [
      'End the conversation and contact your bank using its official app or website.',
      'Never rely on a contact number or link provided in the suspicious message.',
      'Check your account activity directly through your banking app.'
    ],
    next: [
      'Stop — do not disclose passwords or authorise a transfer.',
      'Verify — contact the bank through a channel you find independently.',
      'Report — use the bank’s official support channels if you suspect a scam.'
    ],
    example: '“Your account has been compromised. Transfer your savings to this temporary safe account now.”'
  },
  {
    id: 'family-impersonation',
    title: 'Family / Friend Impersonation',
    category: 'Impersonation',
    categoryCode: 'FAMILY',
    icon: 'users',
    minutes: 3,
    difficulty: 'Beginner',
    summary: 'A scammer pretends to be a loved one and urgently asks for money.',
    introduction: 'You might receive a message from an unfamiliar number claiming to be a family member who has lost their phone. The scammer uses trust and urgency to request a transfer.',
    unfolds: [
      'A new number contacts you and claims to belong to a relative or close friend.',
      'The sender explains why they cannot use their usual phone or speak normally.',
      'They request an urgent transfer, often with a promise to repay you later.'
    ],
    redFlags: [
      'An unfamiliar number claims to belong to someone you know.',
      'The sender refuses a phone or video call.',
      'The message pressures you to send money straight away.',
      'Payment details do not match the person you think you are helping.'
    ],
    verify: [
      'Call the person using the number you already have saved.',
      'Ask something only the real person would know, but do not rely on that check alone.',
      'Confirm the request with another trusted family member if necessary.'
    ],
    next: [
      'Pause before making any transfer.',
      'Verify the request independently through a familiar contact method.',
      'Block and report the suspicious account when you confirm it is fake.'
    ],
    example: '“Mum, I changed my number. I need $800 urgently and cannot call. Can you PayNow me?”'
  },
  {
    id: 'deepfake',
    title: 'Deepfake Voice & Video',
    category: 'Impersonation',
    categoryCode: 'DEEPFAKE',
    icon: 'audio',
    minutes: 4,
    difficulty: 'Developing',
    summary: 'AI-generated voices or videos can make an impersonation attempt seem more believable.',
    introduction: 'An attacker may use synthetic audio or video to imitate a familiar person. A convincing voice or face alone is not proof that a request is genuine.',
    unfolds: [
      'You receive a voice clip or video call that appears to show a familiar person.',
      'They describe an emergency and ask you to act quickly.',
      'You are directed to transfer money or reveal sensitive information.'
    ],
    redFlags: [
      'Unexpected requests for money or confidential details.',
      'Pressure not to check with others.',
      'Unusual timing, contact details or payment instructions.',
      'A voice or video presented as the only proof of identity.'
    ],
    verify: [
      'End the call and contact the person through a known number.',
      'Confirm any payment request through an independent channel.',
      'Treat unusual instructions as suspicious even if the voice sounds familiar.'
    ],
    next: [
      'Do not act based on voice or video alone.',
      'Check the request with the person directly.',
      'Report impersonation attempts through the relevant official service.'
    ],
    example: '“It’s me. I can’t talk long — please send the payment now. I’ll explain afterwards.”'
  },
  {
    id: 'fake-boss',
    title: 'Fake Boss / Colleague',
    category: 'Impersonation',
    categoryCode: 'BOSS',
    icon: 'briefcase',
    minutes: 3,
    difficulty: 'Developing',
    summary: 'An impostor poses as a supervisor and requests a confidential or urgent payment.',
    introduction: 'Workplace impersonation scams exploit authority. Someone may imitate a manager in a chat or email and instruct an employee to pay an unfamiliar account.',
    unfolds: [
      'An urgent message appears to come from your manager or colleague.',
      'The sender asks for a transfer or purchase and insists on secrecy.',
      'You may be pressured to skip normal approval procedures.'
    ],
    redFlags: [
      'A new number or changed email address is used.',
      'The request bypasses normal work approval procedures.',
      'You are told not to tell anyone else.',
      'The payment destination is new or has recently changed.'
    ],
    verify: [
      'Contact your manager using your usual work channel.',
      'Follow your organisation’s normal payment approval process.',
      'Independently confirm any change in payment instructions.'
    ],
    next: [
      'Do not bypass standard approvals.',
      'Verify the request with the real sender.',
      'Notify your team’s security contact about suspicious instructions.'
    ],
    example: '“I am in a meeting. Please make this urgent supplier payment now and keep it confidential.”'
  },
  {
    id: 'ecommerce-scam',
    title: 'Online Shopping Scam',
    category: 'Shopping',
    categoryCode: 'SHOPPING',
    icon: 'shopping',
    minutes: 3,
    difficulty: 'Beginner',
    summary: 'A fake seller offers attractive deals, then disappears after receiving payment.',
    introduction: 'Scammers may advertise popular items at unusually low prices and convince buyers to pay outside a trusted marketplace.',
    unfolds: [
      'An attractive listing appears on a marketplace or social media.',
      'The seller insists on direct transfer or an external payment link.',
      'The item never arrives, or the seller stops responding.'
    ],
    redFlags: [
      'Price is much lower than comparable listings.',
      'The seller insists on paying outside the platform.',
      'Reviews or seller details are missing or suspicious.',
      'You are pressured to pay immediately to secure the offer.'
    ],
    verify: [
      'Check seller history and independent reviews.',
      'Use the marketplace’s supported payment and buyer-protection process.',
      'Check the product and seller details before payment.'
    ],
    next: [
      'Avoid transferring money to an unfamiliar personal account.',
      'Keep messages and receipts as evidence.',
      'Report suspicious listings to the platform.'
    ],
    example: '“Limited stock! PayNow me directly now and I’ll reserve the item at half price.”'
  },
  {
    id: 'job-scam',
    title: 'Fake Job Offer',
    category: 'Jobs & Investments',
    categoryCode: 'JOB',
    icon: 'clipboard',
    minutes: 4,
    difficulty: 'Developing',
    summary: 'A supposed recruiter asks you to pay money or complete paid tasks to earn a salary.',
    introduction: 'Fake recruiters may approach you over messaging apps with flexible, high-paying work. You could be asked to deposit money before you can receive your earnings.',
    unfolds: [
      'A recruiter offers simple remote tasks with high earnings.',
      'Small initial rewards build trust.',
      'You are told to pay a deposit or top up a task balance to withdraw earnings.'
    ],
    redFlags: [
      'Unsolicited offers promise unusually high returns for little work.',
      'You must pay to start work or withdraw wages.',
      'The recruiter cannot be verified through official company channels.',
      'The tasks require repeated transfers to personal accounts.'
    ],
    verify: [
      'Check vacancies on the employer’s official career website.',
      'Contact the employer directly using published contact details.',
      'Never pay an upfront fee to secure a job.'
    ],
    next: [
      'Do not send more money to recover previous deposits.',
      'Save communications as evidence.',
      'Report the suspicious recruiter to the platform and relevant authorities.'
    ],
    example: '“Complete three easy tasks. Deposit $100 first to unlock your next payment.”'
  },
  {
    id: 'investment-scam',
    title: 'Investment Scam',
    category: 'Jobs & Investments',
    categoryCode: 'INVESTMENT',
    icon: 'chart',
    minutes: 4,
    difficulty: 'Developing',
    summary: 'An investment opportunity promises unusually high profits with little or no risk.',
    introduction: 'Fraudsters may display fake trading returns or pose as investment professionals to convince customers to send more and more money.',
    unfolds: [
      'Someone introduces an exclusive investment opportunity.',
      'A dashboard or testimonials show impressive but unverified returns.',
      'You are asked for more deposits or fees before any withdrawal.'
    ],
    redFlags: [
      'Returns are described as guaranteed or risk-free.',
      'You must act quickly or keep the opportunity secret.',
      'The company or adviser cannot be independently verified.',
      'Withdrawals require unexpected extra payments.'
    ],
    verify: [
      'Research the company using official regulatory resources.',
      'Be cautious of guarantees and unsolicited investment approaches.',
      'Seek independent advice before making financial commitments.'
    ],
    next: [
      'Do not deposit more funds to unlock withdrawals.',
      'Keep transaction records and communications.',
      'Report suspected fraud through official channels.'
    ],
    example: '“Guaranteed 15% weekly profits. Invest today or lose your exclusive opportunity.”'
  }
];

export const topicCategories = ['All topics', 'Impersonation', 'Shopping', 'Jobs & Investments'];

export const quickTips = [
  { title: 'Red flags', subtitle: 'Know the signs before you send.', icon: 'flag', topicId: 'fake-bank-officer' },
  { title: 'Verify independently', subtitle: 'Contact people through channels you already trust.', icon: 'shield', topicId: 'family-impersonation' },
  { title: 'What to do next', subtitle: 'Stop, check and report a suspicious request.', icon: 'check', topicId: 'deepfake' }
];

export const awarenessCategories = [
  { code: 'FAMILY', title: 'Family & Friend Impersonation', description: 'Recognising urgent requests that appear to come from loved ones.', topicId: 'family-impersonation' },
  { code: 'BANK', title: 'Fake Bank Officer', description: 'Recognising requests for OTPs, passwords and unsafe transfers.', topicId: 'fake-bank-officer' },
  { code: 'BOSS', title: 'Fake Boss & Colleague', description: 'Recognising workplace impersonation and payment pressure.', topicId: 'fake-boss' }
];

/**
 * Demo-only readiness questions. Correct options should NOT be sent to React
 * after real Supabase / Express integration: move grading into the backend.
 */
export const readinessQuestions = [
  { id: 1, category: 'FAMILY', text: 'A new number says it belongs to your daughter and asks you to PayNow $500 urgently. What is the safest first step?', options: ['Transfer the money immediately', 'Call her usual number to verify', 'Ask the new number for its PayNow name', 'I am not sure'], correct: 1, feedback: 'Verify using an existing contact method before considering any payment.' },
  { id: 2, category: 'FAMILY', text: 'The sender refuses a call and says you must keep the transfer secret. What does this suggest?', options: ['It proves the person is genuine', 'Secrecy makes the transfer safer', 'It is a warning sign of impersonation', 'I am not sure'], correct: 2, feedback: 'Secrecy and urgency are warning signs; verify independently.' },
  { id: 3, category: 'FAMILY', text: 'A relative sends a voice recording asking for money. Is the voice alone enough proof?', options: ['Yes, voices cannot be copied', 'No, verify through a trusted channel', 'Yes, if the message sounds emotional', 'I am not sure'], correct: 1, feedback: 'Audio can be imitated. Confirm requests using a known contact method.' },
  { id: 4, category: 'BANK', text: 'A caller claiming to be from your bank asks you to disclose an OTP. What should you do?', options: ['Read out the OTP', 'Share only part of the OTP', 'End the call and contact the bank officially', 'I am not sure'], correct: 2, feedback: 'Never share OTPs or passwords. Contact your bank independently.' },
  { id: 5, category: 'BANK', text: 'Someone instructs you to transfer savings to a “safe account” to protect them. What is the best response?', options: ['Follow the instruction immediately', 'Refuse and verify through the official bank app', 'Send a small test amount', 'I am not sure'], correct: 1, feedback: 'A request to move funds into a supposed safe account is a major warning sign.' },
  { id: 6, category: 'BANK', text: 'A suspicious message includes a phone number to call back. Which contact method is safest?', options: ['The number in the message', 'A link provided by the caller', 'Contact details you find on the bank’s official website or app', 'I am not sure'], correct: 2, feedback: 'Use contact details independently obtained from official channels.' },
  { id: 7, category: 'BOSS', text: 'A manager supposedly messages from an unfamiliar number requesting an urgent supplier payment. What should you do?', options: ['Skip approvals to help quickly', 'Verify with the manager via a usual work channel', 'Pay first and ask later', 'I am not sure'], correct: 1, feedback: 'Follow established approval procedures and confirm the sender separately.' },
  { id: 8, category: 'BOSS', text: 'A payment request asks you not to tell other colleagues. How should you interpret this?', options: ['It is a reason to check more carefully', 'It means the payment is important and safe', 'It replaces the normal approval process', 'I am not sure'], correct: 0, feedback: 'Pressure to keep a payment secret is a warning sign.' },
  { id: 9, category: 'BOSS', text: 'A supplier suddenly changes their receiving bank account. Which action is safest?', options: ['Use the new account without checking', 'Ask the person in the suspicious email', 'Confirm the change using independently known supplier contact details', 'I am not sure'], correct: 2, feedback: 'Independently verify changes to payment destinations.' }
];

export function getAwarenessLevel(percentage) {
  if (percentage >= 80) return 'Confident';
  if (percentage >= 50) return 'Developing';
  return 'Beginner';
}
