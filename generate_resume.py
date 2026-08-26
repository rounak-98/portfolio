import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=30,
        rightMargin=30,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette - Cool Deep Cobalt & Slate
    PRIMARY_COLOR = colors.HexColor('#0f172a')     # Dark Slate
    ACCENT_COLOR = colors.HexColor('#0284c7')      # Sky Blue / Cyan
    TEXT_COLOR = colors.HexColor('#1e293b')        # Slate 800
    MUTED_COLOR = colors.HexColor('#475569')       # Slate 600
    LINE_COLOR = colors.HexColor('#cbd5e1')        # Slate 300

    # Custom Paragraph Styles
    style_name = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=PRIMARY_COLOR
    )

    style_title = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        alignment=TA_CENTER,
        textColor=ACCENT_COLOR
    )

    style_contact = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=MUTED_COLOR
    )

    style_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=12.5,
        textColor=PRIMARY_COLOR,
        spaceAfter=2,
        textTransform='uppercase'
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_COLOR
    )

    style_body_bold = ParagraphStyle(
        'BodyBoldCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=PRIMARY_COLOR
    )

    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_COLOR,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2
    )

    story = []

    # --- HEADER ---
    story.append(Paragraph("ROUNAK PATHAK", style_name))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Aspiring Data Analyst &nbsp;|&nbsp; Machine Learning Engineer &nbsp;|&nbsp; Full-Stack AI Developer", style_title))
    story.append(Spacer(1, 3))
    
    contact_text = (
        "<b>Email:</b> rounakpathak9080@gmail.com &nbsp;•&nbsp; "
        "<b>Phone:</b> +91 8789355439 &nbsp;•&nbsp; "
        "<b>Location:</b> Pune, Maharashtra &nbsp;•&nbsp; "
        "<b>LinkedIn:</b> linkedin.com/in/rounak-pathak-765a25274 &nbsp;•&nbsp; "
        "<b>GitHub:</b> github.com/rounak-98"
    )
    story.append(Paragraph(contact_text, style_contact))
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT_COLOR, spaceAfter=6, spaceBefore=0))

    # --- PROFESSIONAL SUMMARY ---
    story.append(Paragraph("PROFESSIONAL SUMMARY", style_heading))
    summary_p = Paragraph(
        "Motivated Computer Engineering student at Bharati Vidyapeeth College of Engineering Pune (<b>CGPA: 8.7</b>) "
        "specializing in data analytics, machine learning algorithms, and full-stack software development. Currently pursuing "
        "<b>Infosys Springboard Internship 7.0</b> engineering the Food Bridge AI platform alongside building client real estate "
        "applications (Arus Homes) and production web platforms (BizzApp, Library Management, EDA Suite).",
        style_body
    )
    story.append(summary_p)
    story.append(Spacer(1, 5))

    # --- CORE SKILLS ---
    story.append(Paragraph("CORE SKILLS", style_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=0))
    
    skills_data = [
        [Paragraph("<b>Programming & DB:</b>", style_body_bold), Paragraph("Python, SQL & MySQL, JavaScript (ES6+), HTML5/CSS3", style_body)],
        [Paragraph("<b>ML & AI Concepts:</b>", style_body_bold), Paragraph("Regression, Classification, Clustering, NLP, Deep Learning, Computer Vision, Prompt Engineering", style_body)],
        [Paragraph("<b>Algorithms & Stats:</b>", style_body_bold), Paragraph("Random Forest, XGBoost, SVM, Decision Trees, KNN, Naive Bayes, TF-IDF, NER", style_body)],
        [Paragraph("<b>Frameworks & Web:</b>", style_body_bold), Paragraph("FastAPI, React.js, Django, Flask, Streamlit, Gradio, Tailwind CSS, REST APIs", style_body)],
        [Paragraph("<b>Libraries & BI Tools:</b>", style_body_bold), Paragraph("Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch, Matplotlib, Seaborn, Power BI, Tableau", style_body)],
        [Paragraph("<b>Tools & Deployment:</b>", style_body_bold), Paragraph("Git, GitHub, Vercel, Render, VS Code, Jupyter Notebook, PyCharm", style_body)],
    ]
    t_skills = Table(skills_data, colWidths=[110, 440])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 5))

    # --- WORK EXPERIENCE ---
    story.append(Paragraph("WORK EXPERIENCE", style_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=0))

    exp_header = [
        Paragraph("<b>AI Developer Intern</b> &nbsp;|&nbsp; <i>Infosys Springboard Internship 7.0</i>", style_body_bold),
        Paragraph("<font color='#0284c7'><b>Ongoing (Virtual)</b></font>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_exp = Table([exp_header], colWidths=[420, 130])
    t_exp.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_exp)

    story.append(Paragraph("• Architecting and developing the <b>Food Bridge AI</b> platform (<font color='#0284c7'>food-redistribution-ai.vercel.app</font>) for urban food waste reduction and surplus inventory management.", style_bullet))
    story.append(Paragraph("• <b>Tech Stack:</b> Python, FastAPI, React.js, Tailwind CSS, OpenAI GPT-4, Scikit-learn, SQL & MySQL, Vercel.", style_bullet))
    story.append(Spacer(1, 3))

    # Experience 2: Freelance
    exp2_header = [
        Paragraph("<b>Freelance Full-Stack Developer</b> &nbsp;|&nbsp; <i>Arus Homes Developers</i>", style_body_bold),
        Paragraph("<font color='#0284c7'><b>Client Project</b></font>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_exp2 = Table([exp2_header], colWidths=[420, 130])
    t_exp2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_exp2)
    story.append(Paragraph("• Designed and built the <b>Arus Homes</b> real estate & property showcase platform for virtual property tours, listing filters, and client inquiry lead capture.", style_bullet))
    story.append(Paragraph("• <b>Tech Stack:</b> React.js, JavaScript (ES6+), Tailwind CSS, Node.js, REST APIs.", style_bullet))
    story.append(Spacer(1, 5))

    # --- FEATURED REGULAR PROJECTS ---
    story.append(Paragraph("FEATURED REGULAR PROJECTS", style_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=0))

    # Project 1: BizzApp
    p1_head = [
        Paragraph("<b>BizzApp - Smart Business Management Application</b>", style_body_bold),
        Paragraph("<font color='#0284c7'><b>bizzapp.onrender.com</b></font>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_p1 = Table([p1_head], colWidths=[390, 160])
    t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p1)
    story.append(Paragraph("• Engineered an enterprise web application for inventory control, customer quotation processing, GST invoicing, and revenue analytics.", style_bullet))
    story.append(Paragraph("• <b>Tech Stack:</b> Python, Django, MySQL, HTML5/CSS3, JavaScript, Render Cloud.", style_bullet))
    story.append(Spacer(1, 3))

    # Project 2: School Management
    p2_head = [
        Paragraph("<b>School Management System</b>", style_body_bold),
        Paragraph("<font color='#0284c7'><b>GitHub Repository</b></font>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_p2 = Table([p2_head], colWidths=[420, 130])
    t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p2)
    story.append(Paragraph("• Developed an automated school administration platform for student enrollment, course grading, attendance tracking, and fee records.", style_bullet))
    story.append(Paragraph("• <b>Tech Stack:</b> Python, Django, MySQL, HTML5/CSS3, Bootstrap.", style_bullet))
    story.append(Spacer(1, 3))

    # Project 3: EDA Analytics Suite
    p3_head = [
        Paragraph("<b>AI-Powered EDA & Data Analytics Suite</b>", style_body_bold),
        Paragraph("<font color='#0284c7'><b>GitHub Repository</b></font>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_p3 = Table([p3_head], colWidths=[430, 120])
    t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p3)
    story.append(Paragraph("• Developed an interactive data analytics platform performing correlation profiling, automated outlier detection, and AI-driven summary insights.", style_bullet))
    story.append(Paragraph("• <b>Tech Stack:</b> Python, Streamlit, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn.", style_bullet))
    story.append(Spacer(1, 5))

    # --- EDUCATION ---
    story.append(Paragraph("EDUCATION", style_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=0))

    edu1 = [
        Paragraph("<b>B.Tech in Computer Engineering</b> &nbsp;|&nbsp; <i>Bharati Vidyapeeth College of Engineering, Pune</i>", style_body),
        Paragraph("<b>2023 – 2027 | CGPA: 8.7</b>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_e1 = Table([edu1], colWidths=[410, 140])
    t_e1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_e1)

    edu2 = [
        Paragraph("<b>Saint Francis School</b> &nbsp;|&nbsp; <i>12th Standard (Science): 80.4% &nbsp;•&nbsp; 10th Standard: 93.0%</i>", style_body),
        Paragraph("<b>2021 – 2023</b>", ParagraphStyle('RText', parent=style_body, alignment=TA_RIGHT))
    ]
    t_e2 = Table([edu2], colWidths=[430, 120])
    t_e2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_e2)
    story.append(Spacer(1, 5))

    # --- CERTIFICATIONS & HONORS ---
    story.append(Paragraph("CERTIFICATIONS & HONORS", style_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=0))
    story.append(Paragraph("• <b>Infosys Springboard:</b> 16 AI & Data Science Certifications (Generative AI, Prompt Engineering, Deep Learning, OpenAI GPT)", style_bullet))
    story.append(Paragraph("• <b>NPTEL (IIT Kharagpur):</b> Introduction to Machine Learning (Elite Academic Certification)", style_bullet))
    story.append(Paragraph("• <b>NPTEL:</b> Database Management System (DBMS) &nbsp;•&nbsp; <b>Naresh IT:</b> Full Stack in Data Science & AI", style_bullet))
    story.append(Spacer(1, 5))

    # --- LANGUAGES ---
    story.append(Paragraph("LANGUAGES KNOWN", style_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=3, spaceBefore=0))
    story.append(Paragraph("• <b>English</b> (Professional) &nbsp;&nbsp;•&nbsp;&nbsp; <b>Hindi</b> (Fluent) &nbsp;&nbsp;•&nbsp;&nbsp; <b>Marathi</b> (Fluent)", style_bullet))

    doc.build(story)
    print(f"Resume generated successfully at: {output_filename}")

if __name__ == "__main__":
    create_resume("public/Rounak_Pathak_Resume.pdf")
    create_resume("public/Rounak_Pathak_Concise_Resume.pdf")
    try:
        create_resume("C:/Users/rouna/Downloads/Rounak Pathak resume.pdf")
    except Exception as e:
        print("Could not update Downloads PDF:", e)
