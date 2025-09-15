
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AuraMind',
  description: 'Privacy Policy for the AuraMind application.',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500">
            Privacy Policy
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="prose prose-lg prose-invert mx-auto text-gray-300">
            <p>
              Welcome to AuraMind. We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, and share your information when you use our application.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">1. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Conversation Data:</strong> The text from your conversations with our AI is processed to provide responses. We do not store conversation history long-term by default, but this may be a feature you can opt into in the future.</li>
              <li><strong>Usage Data:</strong> We may collect data on how you interact with our app, such as features used and session duration, to help us improve the user experience. This data is anonymized.</li>
              <li><strong>Technical Data:</strong> This includes information like your device type and operating system, which helps us diagnose and fix technical issues.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">2. How We Use Your Information</h2>
            <p>
              Your information is used for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide, maintain, and improve our services.</li>
              <li>To personalize your experience.</li>
              <li>To respond to your support requests and questions.</li>
              <li>To monitor and analyze usage and trends to improve the app.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We may share information under the following limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>With AI Service Providers:</strong> Your conversation data is sent to third-party AI service providers (like Google's Gemini) to generate responses. We do not have control over their data handling policies.</li>
              <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to a valid legal request.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no internet-based service is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">5. Your Rights and Choices</h2>
            <p>
              You have the right to access, update, or delete your information. As we currently do not persist user data, there is no data to manage. Should this change, we will update this policy and provide tools for you to manage your data.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">6. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at [Your Contact Email/Support Link].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

    