// Gemini AI API integration
const GEMINI_API_KEY = "AIzaSyCBoUmlZEj3nPBWBOEdKbSCD-KhRD-Myho";
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export type SpiritualQuery = {
  concern: string;
  context?: string;
  faithLevel?: 'beginner' | 'intermediate' | 'advanced';
};

export async function getGuidance(query: SpiritualQuery) {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a Christian spiritual advisor helping someone with the following concern: "${query.concern}". 
                ${query.context ? `Additional context: ${query.context}` : ''}
                ${query.faithLevel ? `Faith knowledge level: ${query.faithLevel}` : 'Faith knowledge level: intermediate'}
                
                Please provide comprehensive biblical guidance that includes:
                1. At least 10 relevant Bible passages with their references
                2. A brief contextual interpretation for each passage
                3. Practical application suggestions for daily life
                4. Historical or theological context where relevant
                
                Format your response in a structured, easy-to-read way. 
                Ensure all guidance aligns with mainstream Christian doctrine and values.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching guidance:', error);
    throw new Error('Failed to get spiritual guidance. Please try again later.');
  }
}