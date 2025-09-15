
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AuraMind',
  description: 'Terms of Service for the AuraMind application.',
};

const TermsOfServicePage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500">
            Terms of Service
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="prose prose-lg prose-invert mx-auto text-gray-300">
            <p>
              Please read these Terms of Service ("Terms") carefully before using the AuraMind application (the "Service") operated by us. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">2. Description of Service</h2>
            <p>
              AuraMind is an AI-powered mental wellness companion. It is designed for supportive conversations and to provide wellness tools. It is not a medical device, and it does not provide medical advice, diagnosis, or treatment.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">3. Important Disclaimers</h2>
            <p>
              The Service is not a substitute for professional mental health care, therapy, or medical advice. If you are experiencing a mental health crisis, please contact a crisis hotline or a qualified medical professional immediately. Reliance on any information provided by the Service is solely at your own risk.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">4. User Conduct</h2>
            <p>
              You agree not to use the Service for any unlawful purpose or to engage in any conduct that could damage, disable, or impair the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of its creators.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">6. Limitation of Liability</h2>
            <p>
              In no event shall we, nor our directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at [Your Contact Email/Support Link].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

    