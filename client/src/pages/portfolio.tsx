import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, ArrowRight, Code2, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { SiKaggle } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const lenisRef = useRef<any>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    toast({
      title: "Message Received!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let rafId: number | null = null;
    let animationActive = false;

    const initLenis = () => {
      if (lenisRef.current) return;
      
      if (!(window as any).Lenis) {
        timeoutId = setTimeout(initLenis, 50);
        return;
      }

      lenisRef.current = new (window as any).Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        if (!animationActive) return;
        lenisRef.current?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      animationActive = true;
      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      animationActive = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let lenisScrollHandler: ((e: { scroll: number }) => void) | null = null;

    const initGSAP = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      if (!gsap || !ScrollTrigger) {
        setTimeout(initGSAP, 50);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-role",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1, ease: "back.out(1.7)" }
      );

      gsap.fromTo(
        ".hero-stats",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.1, stagger: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-profile-card",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );

      (gsap.utils.toArray(".floating-blob") as HTMLElement[]).forEach((blob: HTMLElement, i: number) => {
        gsap.to(blob, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      const revealSections = gsap.utils.toArray(".reveal-section") as HTMLElement[];
      revealSections.forEach((section: HTMLElement) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              scrub: false,
            },
          }
        );
      });

      const skillChips = gsap.utils.toArray(".skill-chip") as HTMLElement[];
      skillChips.forEach((chip: HTMLElement, i: number) => {
        gsap.fromTo(
          chip,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: chip,
              start: "top 90%",
            },
            delay: (i % 10) * 0.05,
          }
        );
      });

      const updateActiveSection = () => {
        const scrollPosition = (lenisRef.current ? lenisRef.current.scroll : window.scrollY) + 150;
        
        const sectionOrder = ["hero", "about", "skills", "projects", "experience", "education", "contact"];
        let currentSection = "hero";
        
        for (const id of sectionOrder) {
          const element = sectionsRef.current[id];
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              currentSection = id;
            }
          }
        }
        
        setActiveSection(currentSection);
      };

      lenisScrollHandler = ({ scroll }: { scroll: number }) => {
        updateActiveSection();
      };

      if (lenisRef.current) {
        lenisRef.current.on('scroll', lenisScrollHandler);
      }
      updateActiveSection();
    };

    initGSAP();

    return () => {
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
      if (lenisScrollHandler && lenisRef.current) {
        lenisRef.current.off('scroll', lenisScrollHandler);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -80,
        duration: 1.2,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-lg font-bold text-primary hover-elevate active-elevate-2 px-3 py-1 rounded-md transition-colors"
            data-testid="button-logo"
          >
            AN
          </button>
          <div className="hidden md:flex items-center gap-1">
            {["About", "Skills", "Projects", "Experience", "Education", "Contact"].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid={`button-nav-${sectionId}`}
                >
                  {item}
                  {isActive && (
                    <div className="h-0.5 bg-primary mt-1 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-blob absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="floating-blob absolute top-40 right-20 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="floating-blob absolute bottom-40 left-1/4 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl" />
      </div>

      <section
        id="hero"
        ref={(el) => (sectionsRef.current.hero = el)}
        className="relative min-h-screen flex items-center pt-16"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="hero-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Avdhoot Ramkrishna{" "}
                  <span className="text-primary">Nakod</span>
                </h1>
                <h2 className="hero-role text-2xl md:text-3xl font-semibold text-foreground/90">
                  Data Scientist & Machine Learning Engineer
                </h2>
                <p className="hero-tagline text-xl md:text-2xl text-primary/90 font-light italic">
                  "Data-driven thinking. ML-powered execution."
                </p>
              </div>

              <p className="hero-description text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                I enjoy taking messy, real-world data and turning it into clear insights and production-ready machine learning systems. From analysis and feature engineering to model development, I focus on building solutions that are practical, efficient, and impactful.
              </p>

              <div className="hero-cta flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="group"
                  data-testid="button-view-projects"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  data-testid="button-contact"
                >
                  Contact Me
                </Button>
              </div>

              <div className="pt-4 space-y-3">
                <div className="hero-stats flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>End-to-end ML: From data cleaning to evaluation-ready models</span>
                </div>
                <div className="hero-stats flex items-center gap-2 text-sm text-muted-foreground">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span>Core Stack: Python · SQL · Scikit-learn · Streamlit</span>
                </div>
                <div className="hero-stats flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Focus Areas: Operations analytics · Predictive modeling · Automation</span>
                </div>
              </div>

              <Badge variant="outline" className="text-sm px-4 py-2 border-primary/30 text-foreground">
                <Sparkles className="h-3 w-3 mr-2 text-primary" />
                Open to: Data Science · Machine Learning · Data Analytics roles (Remote · Hybrid · Onsite)
              </Badge>
            </div>

            <Card className="hero-profile-card bg-card/50 backdrop-blur-sm border-card-border">
              <CardHeader className="text-center pb-6">
                <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                    AN
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">Avdhoot Nakod</CardTitle>
                <CardDescription className="text-base">Data Scientist & ML Engineer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Pune, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:nakodavdhoot@gmail.com" className="hover:text-primary transition-colors" data-testid="link-email">
                    nakodavdhoot@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+918766012472" className="hover:text-primary transition-colors" data-testid="link-phone">
                    +91 87660 12472
                  </a>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/avdhoot-nakod/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid="link-linkedin"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </a>
                    <a
                      href="https://github.com/Avdhoot1574/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid="link-github"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Button>
                    </a>
                    <a
                      href="https://www.kaggle.com/avdhootnakod"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid="link-kaggle"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <SiKaggle className="h-4 w-4 mr-2" />
                        Kaggle
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={(el) => (sectionsRef.current.about = el)}
        className="reveal-section relative py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm Avdhoot, a data-driven problem solver who loves turning raw data into clear insights and intelligent systems. I'm familiar with data analysis, machine learning, and end-to-end model development, and I enjoy building solutions that are practical, efficient, and impactful.
            </p>
            <p>
              I like working on projects that feel close to real business problems — things like predicting bottlenecks, understanding patterns in data, and building pipelines that actually get used. I care about clarity: clean code, clear analysis, and communicating results in a way that non-technical people can act on.
            </p>
            <p>
              I'm looking for opportunities in Data Science, Machine Learning, and Data Analytics — whether remote, hybrid, or onsite. I'm especially interested in roles where I can learn fast, solve real-world problems, and contribute to products that make a meaningful difference.
            </p>
          </div>
        </div>
      </section>

      <section
        id="skills"
        ref={(el) => (sectionsRef.current.skills = el)}
        className="reveal-section relative py-24 md:py-32 bg-card/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Skills & <span className="text-primary">Expertise</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-primary text-lg">Programming Languages</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Python", "C", "SQL", "Java"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="skill-chip" data-testid={`skill-${skill.toLowerCase()}`}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-accent-purple text-lg">Machine Learning / Data Science</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "Supervised & Unsupervised Learning",
                  "Model Training & Evaluation",
                  "Data Cleaning & Feature Engineering",
                  "Exploratory Data Analysis",
                  "ML Pipeline Building",
                  "Statistics & Probability",
                  "Hyperparameter Tuning",
                  "Handling Imbalanced Data",
                  "Real-world Problem Solving",
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="skill-chip" data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-accent-orange text-lg">Frameworks & Libraries</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "NumPy",
                  "Pandas",
                  "Scikit-learn",
                  "Matplotlib",
                  "Seaborn",
                  "Streamlit",
                  "TensorFlow (Basics)",
                  "PyTorch (Basics)",
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="skill-chip" data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-primary text-lg">Tools & Platforms</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "Jupyter Notebook",
                  "VS Code",
                  "Git",
                  "GitHub",
                  "Excel (Advanced)",
                  "Google Sheets",
                  "Google Colab",
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="skill-chip" data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Other Strengths</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "Problem Solving & Analytical Thinking",
                  "Data Visualization & Storytelling",
                  "Clean Code & Modular ML Practices",
                  "Building KPI Dashboards",
                  "Documentation & Reporting",
                  "Curiosity-driven Learning",
                  "Fast, Dynamic Environments",
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="skill-chip" data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={(el) => (sectionsRef.current.projects = el)}
        className="reveal-section relative py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover-elevate" data-testid="card-project-opsflow">
              <div className="h-48 bg-gradient-to-br from-primary/20 via-accent-purple/20 to-accent-orange/20 rounded-t-lg flex items-center justify-center">
                <div className="text-6xl opacity-50">🔄</div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-2xl text-foreground">OpsFlow AI</CardTitle>
                  <Badge variant="outline" className="border-primary/30 text-primary">Featured</Badge>
                </div>
                <CardDescription className="text-lg font-medium text-primary/90">
                  Dynamic Operations Bottleneck Predictor & Auto-Resolution Engine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  An intelligent operations-optimization system that predicts workflow bottlenecks before they slow down business. Analyzes operational data — tickets, queues, delays, workloads, and throughput — to detect early signs of congestion.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Forecasts bottlenecks using time-series modeling and workload prediction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Generates automatic, data-backed recommendations for resource optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Produces "Impact Score" quantifying potential performance improvements</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Python", "NumPy", "Pandas", "Scikit-learn", "EDA & Visualization"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full" disabled data-testid="button-opsflow-demo">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Repo / Demo Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-dashed hover-elevate" data-testid="card-project-upcoming">
              <div className="h-48 bg-gradient-to-br from-muted/20 to-muted/10 rounded-t-lg flex items-center justify-center">
                <Sparkles className="h-16 w-16 text-muted-foreground/30" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">More Projects Coming Soon</CardTitle>
                <CardDescription className="text-base">Actively working on new ML & Analytics projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  I'm currently developing several exciting projects that will showcase my skills in:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Customer churn prediction with supervised ML</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Interactive KPI dashboards with Streamlit and BI tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>Advanced predictive modeling and analytics projects</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground italic pt-2">
                  Projects will be added as they become presentable and well-documented.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="experience"
        ref={(el) => (sectionsRef.current.experience = el)}
        className="reveal-section relative py-24 md:py-32 bg-card/20"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Experience & <span className="text-primary">Growth</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">Aspiring Data Scientist & Machine Learning Engineer</CardTitle>
                  <CardDescription className="text-base">Fresher – Self-Driven Learning & Projects</CardDescription>
                </div>
                <Badge variant="outline" className="w-fit border-primary/30 text-primary">
                  2023 – Present
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Building end-to-end machine learning and analytics projects to solve realistic business-style problems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Strengthening fundamentals in statistics, ML algorithms, feature engineering, and model evaluation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Practicing clean, modular code, documentation, and storytelling to communicate results clearly to non-technical stakeholders
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="education"
        ref={(el) => (sectionsRef.current.education = el)}
        className="reveal-section relative py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Education & <span className="text-primary">Certifications</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Bachelor's Degree</CardTitle>
                    <CardDescription className="text-base">Savitribai Phule Pune University, Pune, Maharashtra, India</CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <Badge variant="outline" className="border-primary/30 text-primary">2023 – 2026</Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/30">CGPA: 9.55 / 10</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building a strong foundation in computer science, programming, algorithms, statistics, and data-related subjects.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl">Data Analysis Using Python</CardTitle>
                    <Badge variant="outline" className="border-primary/30">2024</Badge>
                  </div>
                  <CardDescription className="text-sm font-semibold text-primary/80">IBM</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Skills acquired:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python for Data Analysis",
                      "Data Wrangling with Pandas",
                      "Exploratory Data Analysis",
                      "Descriptive Statistics",
                      "Data Visualization",
                      "Matplotlib",
                      "Seaborn",
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl">Intermediate Machine Learning</CardTitle>
                    <Badge variant="outline" className="border-primary/30">2024</Badge>
                  </div>
                  <CardDescription className="text-sm font-semibold text-primary/80">Kaggle</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Skills acquired:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Supervised ML Algorithms",
                      "Missing Data Handling",
                      "Categorical Data",
                      "Model Validation",
                      "Hyperparameter Tuning",
                      "Gradient Boosting",
                      "Ensemble Methods",
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={(el) => (sectionsRef.current.contact = el)}
        className="reveal-section relative py-24 md:py-32 bg-card/20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              If you're looking for a motivated fresher who can think in terms of data, design clean ML workflows, and grow quickly with your team, I'd love to connect.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Send a Message</CardTitle>
                <CardDescription>Fill out the form and I'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-background/50"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-background/50"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              rows={5}
                              className="bg-background/50"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" data-testid="button-send-message">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="mailto:nakodavdhoot@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-all"
                    data-testid="link-contact-email"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">nakodavdhoot@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+918766012472"
                    className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-all"
                    data-testid="link-contact-phone"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+91 87660 12472</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">Pune, Maharashtra, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="https://www.linkedin.com/in/avdhoot-nakod/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-linkedin"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <Linkedin className="h-5 w-5 mr-3 text-primary" />
                      Connect on LinkedIn
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                  </a>
                  <a
                    href="https://github.com/Avdhoot1574/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-github"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <Github className="h-5 w-5 mr-3 text-primary" />
                      View GitHub Profile
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                  </a>
                  <a
                    href="https://www.kaggle.com/avdhootnakod"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-kaggle"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <SiKaggle className="h-5 w-5 mr-3 text-primary" />
                      Check Kaggle Profile
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Avdhoot Nakod. Built with React, Tailwind CSS, and GSAP.
          </p>
        </div>
      </footer>
    </div>
  );
}
