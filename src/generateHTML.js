const generateHTML = (manager, employees) => {
  let html = '';

  //generate manager
  html += `
<header>Team Profile</header>
<div class="grid-container">
  <div class="manager grid-item">
    <h2>${manager.managerName}</h2>
    <h3>Manager</h3>
    <p>ID: ${manager.managerId}</p>
    <p>Email: <a href="mailto:${manager.managerEmail}">${manager.managerEmail}</a></p>
    <p>Office: ${manager.managerOffice}</p>
  </div>
</div>
  `;

  // Generate HTML for each employee
  employees.forEach((employee) => {
    html += `
    <div class="grid-container">
      <div class="employee grid-item">
        <h2>${employee.name}</h2>
        <h3>${employee.role}</h3>
        <p>ID: ${employee.id}</p>
        <p>Email: <a href="mailto:${employee.email}">${employee.email}</a></p>  
    `;
    if (employee.school) {
      html += `<p>School: ${employee.school}</p>`;
    }
    if (employee.github) {
      html += `<p>GitHub: <a href="https://github.com/${employee.github}">${employee.github}</a></p>`;
    }
    html += `</div>
    </div>
    `;
  });

  // Return the final HTML string
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Team Roster</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
};

module.exports = generateHTML;