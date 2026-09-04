import { useEffect, useState } from 'react';
import { api } from './services/api';
// Importação dos logos oficiais
import { FaNodeJs, FaPython, FaReact, FaGitAlt, FaDocker, FaJava, FaVuejs, FaAngular, FaLaravel } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiObsidian, SiIntellijidea, SiPycharm, SiKotlin, SiSpringboot, SiNextdotjs, SiNestjs, SiDjango, SiSharp, SiEclipseide, SiNotion } from 'react-icons/si';
import { DiPostgresql } from 'react-icons/di';
import { VscVscode, VscTerminal } from 'react-icons/vsc';
import { TbDatabaseCog } from 'react-icons/tb';
import { BsStars } from 'react-icons/bs';

interface Category {
  id: string;
  name: string;
}

interface Technology {
  id: string;
  category_id: string;
  name: string;
  description: string;
}

// Função para retornar o ícone correto baseado no ID da tecnologia
const getTechIcon = (id: string) => {
  switch (id) {
    // Linguagens e Ferramentas Antigas
    case 'nodejs': return <FaNodeJs />;
    case 'python': return <FaPython />;
    case 'react': return <FaReact />;
    case 'git': return <FaGitAlt />;
    case 'docker': return <FaDocker />;
    case 'postgresql': return <DiPostgresql />;
    case 'pgadmin': return <TbDatabaseCog />;
    case 'vscode': return <VscVscode />;
    case 'typescript': return <SiTypescript />;
    case 'cpp': return <SiCplusplus />;
    case 'java': return <FaJava />;
    case 'obsidian': return <SiObsidian />;
    case 'intellij': return <SiIntellijidea />;
    case 'pycharm': return <SiPycharm />;

    // Novas Tecnologias
    case 'kotlin': return <SiKotlin />;
    case 'csharp': return <SiSharp />;
    case 'springboot': return <SiSpringboot />;
    case 'vuejs': return <FaVuejs />;
    case 'nextjs': return <SiNextdotjs />;
    case 'nestjs': return <SiNestjs />;
    case 'angular': return <FaAngular />;
    case 'django': return <SiDjango />;
    case 'laravel': return <FaLaravel />;
    case 'eclipse': return <SiEclipseide />;
    case 'cursor': return <BsStars />;
    case 'antigravity': return <VscTerminal />;
    case 'notion': return <SiNotion />;

    default: return <TbDatabaseCog />;
  }
};

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [catsRes, techsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/technologies')
        ]);
        setCategories(catsRes.data);
        setTechnologies(techsRes.data);
      } catch (error) {
        console.error("Erro ao carregar o catálogo:", error);
      }
    }
    loadData();
  }, []);

  const toggleTechnology = (techId: string) => {
    setSelectedTechs(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
    setGeneratedScript(null);
  };

  const handleGenerateScript = async () => {
    if (selectedTechs.length === 0) return;

    setIsGenerating(true);
    try {
      const response = await api.post('/scripts/generate', {
        technologyIds: selectedTechs
      });
      setGeneratedScript(response.data.content);
    } catch (error) {
      console.error("Erro ao gerar o script:", error);
      alert("Ocorreu um erro ao gerar o script.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      alert("Script copiado para a área de transferência!");
    }
  };

  const handleDownload = () => {
    if (generatedScript) {
      const blob = new Blob([generatedScript], { type: 'text/x-sh' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'setup.sh';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">DevSetup</h1>
        <p className="app-subtitle">
          Selecione as tecnologias e gere seu ambiente de desenvolvimento.
        </p>
      </header>

      <main className="glass-panel">
        {categories.length === 0 ? (
          <p className="text-center app-subtitle">Carregando catálogo...</p>
        ) : (
          <>
            <div className="catalog-section">
              {categories.map(category => {
                const categoryTechs = technologies.filter(t => t.category_id === category.id);
                if (categoryTechs.length === 0) return null;

                return (
                  <div key={category.id}>
                    <h2 className="category-title">{category.name}</h2>
                    <div className="tech-grid">
                      {categoryTechs.map(tech => (
                        <div
                          key={tech.id}
                          className={`tech-card ${selectedTechs.includes(tech.id) ? 'selected' : ''}`}
                          onClick={() => toggleTechnology(tech.id)}
                        >
                          {/* Renderização do ícone ao lado do título */}
                          <div className="tech-header">
                            <span className="tech-icon">{getTechIcon(tech.id)}</span>
                            <span className="tech-name">{tech.name}</span>
                          </div>
                          <span className="tech-desc">{tech.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="action-section">
              <button
                className="btn-primary"
                onClick={handleGenerateScript}
                disabled={selectedTechs.length === 0 || isGenerating}
              >
                {isGenerating ? 'Gerando...' : 'Gerar Script (setup.sh)'}
              </button>

              {generatedScript && (
                <div className="script-preview-container">
                  <div className="script-header">
                    <span style={{ fontWeight: 600 }}>setup.sh</span>
                    <div className="script-actions">
                      <button className="btn-secondary" onClick={handleCopy}>Copiar</button>
                      <button className="btn-secondary" onClick={handleDownload}>Baixar</button>
                    </div>
                  </div>
                  <pre className="script-content">
                    <code>{generatedScript}</code>
                  </pre>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;