import { Link } from '@remix-run/react';

const NoticeText = () => {
  return (
    <div>
      <h2>Introducing Striae – A New Tool for Firearms Examiners</h2>
      <p>
        We are excited to announce Striae, an innovative web app designed to assist firearms examiners in creating detailed annotations for your comparison images. Striae aims to streamline the processes of labeling, note-taking, and printing, making the review process a little bit easier.
      </p>
      <p><strong>Features of Striae</strong></p>
      <ul>
        <li>
            <strong>Annotation Tools:</strong> Simplify the process of marking and labeling comparison images with ease. Add case and item number labels, labels for class characteristics, a potential subclass warning/indicator, an indexing color/number indicator, support indicator for ID, inconclusive, or exclusion, and more.
        </li>
        <li>
            <strong>Streamlined Note-Taking:</strong> Keep comprehensive and organized notes directly linked to your comparison images. Add or modify your notes at any time, and easily print them or save as a PDF for your casefile.
        </li>
        <li>
            <strong>Optimized Tech Review and Confirmations: </strong> Easily revisit and refine your analysis with clear, accessible records. Help your tech reviewer understand your findings and conclusions, and provide a clear record for confirmations.
        </li>
        <li>
            <strong>Convert to PDF to Save or Print: </strong> Generate professional-quality PDF outputs for documentation and reporting.
        </li>
      </ul>
      <p><strong>Security Features of Striae</strong></p>
      <p>
        Coming from a forensics background ourselves, we understand the necessity for strong security measures in order to protect your data and files. From day one, Striae was designed with data security as a top priority.
        <p>
            We have implemented the following security features in Striae:
        </p>
      </p>
      <ul>
        <li>
            <strong>Authentication and Password Security:</strong> Striae relies on Firebase Authentication, a secure platform by Google, to manage user authentication. Features of Firebase include hashed passwords, secure token generation, and multi-factor authentication options.
        </li>
        <li>
            <strong>Data Storage:</strong> Your data is encrypted and protected against unauthorized access. Measures include data segregation, AES-256 encryption, and no plaintext storage of sensitive information.
        </li>
        <li>
            <strong>Data Transit:</strong> Data transfers are encrypted using TLS and signed URLs.
        </li>
        <li>
            <strong>Controlled Access and Monitoring:</strong> Access requests are logged for auditing and security. Data access is limited to you or authorized troubleshooting only. CORS support restricts data requests to Striae&apos;s domain exclusively.
        </li>
        <li>
            <strong>Transparency and Accountability:</strong> We maintain an open security policy, which encourages reporting of vulnerabilities and issues. We are committed to addressing any security concerns promptly and transparently. Striae does not share sensitive data with third parties, nor is any data stored with Striae subject to scraping, analysis, or processing for any purpose other than the intended use of the app. 
        </li>
        <li>
            <strong>Control Over Your Data:</strong> Striae will never edit or modify the contents of your data. The only edits made to your data will be resizing and compression for optimal display, storage, and performance. When you delete your data, it is permanently removed from our systems.
        </li>        
      </ul>
      <p>If you have any questions or concerns regarding our security protocols, please refer to the <Link to="/terms#storage">Data Storage Addendum</Link> in the Terms & Conditions, or contact us at <Link to="mailto:info@striae.org" target="_blank" rel="noopener noreferrer">info@striae.org</Link>.</p>
      <p>
        <strong>Open Source Commitment</strong>
      </p>
      <p>
        Striae is an open-source project, supporting transparency, collaboration, and continuous improvement from the firearms examiner community. The entire codebase is available on <Link to="https://github.com/StephenJLu/striae">GitHub</Link>. We welcome contributions, suggestions, and feedback from users and developers interested in shaping the future of digital annotation tools for forensic firearms examination.
      </p>
      <p>
        By making Striae open source, we aim to foster community involvement, maintain accountability for security and privacy, and ensure that users can adapt and verify the tool for specialized casework or agency-specific needs. If you have ideas for new features or would like to get involved in development, please visit the repository or contact our team. You can submit issues, feature requests, or pull requests directly on the GitHub repository. For non-developers, links are available in the footer to submit bug reports or feature requests, or to contact support directly.
      </p>      
      <p>
        Thank you for your support, and we hope Striae is a valuable addition to your comparison toolkit!
        </p>
    </div>
  );
};

export default NoticeText;