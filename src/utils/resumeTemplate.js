// Utility to generate a professional HTML resume template
export function generateResumeHTML(resume, profile) {
  // Only use skills if explicitly provided by the user
  let skills = [];
  if (resume.skills && resume.skills.trim()) {
    skills = resume.skills.split(',').map(s => s.trim()).filter(s => s);
  }

  const educationHTML = (resume.education || [])
    .map(edu => `
      <div class="mb-6">
        <p class="text-lg font-bold">${edu.degree || ''} ${edu.field ? `in ${edu.field}` : ''}</p>
        <p class="text-sm text-gray-600">${edu.institution || edu.school || 'N/A'}${edu.startDate || edu.endDate ? ` • ${edu.startDate || ''} ${edu.startDate && edu.endDate ? ' - ' : ''} ${edu.endDate || ''}` : ''}</p>
        ${edu.gpa ? `<p class="text-sm text-gray-600">GPA: ${edu.gpa}</p>` : ''}
        ${edu.achievements?.length ? `<p class="text-sm text-gray-600">${edu.achievements.join(', ')}</p>` : ''}
      </div>
    `)
    .join('');

  const projectsHTML = (resume.projects || [])
    .map(project => `
      <li>
        <div>
          <strong>${project.title || 'Untitled'}</strong>
        </div>
        ${project.description ? `<div class="text-sm text-gray-700 mt-1">${project.description}</div>` : ''}
        ${project.technologies ? `<div class="text-sm text-gray-600">${project.technologies}</div>` : ''}
        ${project.highlights?.length ? `<ul class="list-disc pl-5 mt-1 text-sm text-gray-700">${project.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
      </li>
    `)
    .join('');

  const experiencesHTML = (resume.experiences || [])
    .map(exp => `
      <div class="mb-6">
        <p class="text-lg font-bold">${exp.position || exp.title || 'N/A'} ${exp.company ? `| ${exp.company}` : ''}${exp.location ? ` • ${exp.location}` : ''}</p>
        ${exp.startDate || exp.endDate ? `<p class="text-sm text-gray-600">${exp.startDate || ''} ${exp.startDate && exp.endDate ? ' - ' : ''} ${exp.endDate || ''}</p>` : ''}
        ${exp.description ? `<p class="text-sm text-gray-700 mt-2">${exp.description}</p>` : ''}
        ${exp.achievements?.length ? `<ul class="list-disc pl-5 mt-2 text-sm text-gray-700">${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
      </div>
    `)
    .join('');

  const skillsHTML = skills.length
    ? skills.map(s => `<li>${s}</li>`).join('')
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.name || 'Resume'} - Resume</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body class="bg-gray-100 text-black font-sans">
    <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg mt-10 mb-10">
        <!-- Header -->
        <div class="border-b pb-4 mb-6">
            <div class="flex justify-between items-start">
                <div>
                    <h1 class="text-4xl font-bold">${profile.name || 'Your Name'}</h1>
                    <p class="text-lg text-gray-600">${profile.email || ''} ${profile.email && profile.phone ? '|' : ''} ${profile.phone || ''}</p>
                </div>
                ${profile.city || profile.state ? `<p class="text-lg text-gray-600 text-right mt-6">${profile.city || ''}${profile.city && profile.state ? ', ' : ''}${profile.state || ''}</p>` : ''}
            </div>
        </div>

        <!-- Skills Section -->
        ${skills.length ? `
        <section class="mb-8">
            <h2 class="text-2xl font-semibold border-b pb-2 mb-4">Skills</h2>
            <ul class="list-disc pl-5 space-y-1">
                ${skillsHTML}
            </ul>
        </section>
        ` : ''}

        <!-- Experiences Section -->
        ${resume.experiences?.length ? `
        <section class="mb-8">
            <h2 class="text-2xl font-semibold border-b pb-2 mb-4">Work Experience</h2>
            ${experiencesHTML}
        </section>
        ` : ''}

        <!-- Education Section -->
        ${resume.education?.length ? `
        <section class="mb-8">
            <h2 class="text-2xl font-semibold border-b pb-2 mb-4">Education</h2>
            ${educationHTML}
        </section>
        ` : ''}

        <!-- Projects Section -->
        ${resume.projects?.length ? `
        <section class="mb-8">
            <h2 class="text-2xl font-semibold border-b pb-2 mb-4">Projects</h2>
            <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
                ${projectsHTML}
            </ul>
        </section>
        ` : ''}
    </div>
</body>
</html>
  `.trim();
}
