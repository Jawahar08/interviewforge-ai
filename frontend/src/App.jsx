import { useState, useEffect } from 'react';
import { Upload, FileText, BrainCircuit, Activity, ChevronRight, Play } from 'lucide-react';
import { InterviewService } from './utils/api';
import './index.css';

function App() {
  const [stats, setStats] = useState({ totalInterviews: 0, averageScore: 0, upcoming: 0 });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [chat, setChat] = useState([]);
  const [answer, setAnswer] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');

  useEffect(() => {
    // Load initial stats
    InterviewService.getStats().then((res) => {
      if (res.success) setStats(res.data);
    }).catch(console.error);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadResume = async () => {
    if (!file) return;
    setUploading(true);
    setLoadingMsg('Analyzing resume with AI...');
    try {
      const res = await InterviewService.uploadResume(file);
      // Mocking session creation for demo purposes since we don't have the full flow hooked up 
      // Replace with real session ID from response
      setActiveSession({ id: res.data?.interviewId || 1, currentQuestionId: null });
      setChat([{ role: 'ai', text: 'Resume analyzed successfully. Let\'s start the interview! Generating first question...' }]);
      
      // Auto generate first question
      generateNextQuestion(res.data?.interviewId || 1);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
      setLoadingMsg('');
    }
  };

  const generateNextQuestion = async (sessionId) => {
    try {
      const res = await InterviewService.generateQuestion(sessionId);
      if (res.success) {
        setChat(prev => [...prev, { role: 'ai', text: res.data.questionText }]);
        setActiveSession(prev => ({ ...prev, currentQuestionId: res.data.id }));
      }
    } catch (err) {
      console.error(err);
      setChat(prev => [...prev, { role: 'ai', text: 'Tell me about a challenging project you worked on.' }]);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || !activeSession) return;
    
    const userText = answer;
    setChat(prev => [...prev, { role: 'user', text: userText }]);
    setAnswer('');
    
    try {
      // Mock submit
      await InterviewService.submitAnswer(activeSession.id, activeSession.currentQuestionId, userText);
      generateNextQuestion(activeSession.id);
    } catch (err) {
      console.error(err);
      setTimeout(() => generateNextQuestion(activeSession.id), 1000); // mock delay
    }
  };

  return (
    <div className="app-container">
      <header className="header animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BrainCircuit size={40} color="var(--primary)" />
          <h1 className="header-title">InterviewForge AI</h1>
        </div>
        <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '30px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--success)' }}>● System Online</span>
        </div>
      </header>

      {!activeSession ? (
        <div className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Stats Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3><Activity size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }}/> Your Performance</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{stats.averageScore}%</span>
              <span style={{ color: 'var(--text-muted)' }}>Avg Score</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <span>Total Sessions</span>
              <strong>{stats.totalInterviews}</strong>
            </div>
          </div>

          {/* New Session Panel */}
          <div className="glass-panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3><Play size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }}/> Start New Mock Interview</h3>
            <p style={{ color: 'var(--text-muted)' }}>Upload your latest resume to tailor the AI questions to your experience.</p>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                <button className="btn-secondary">
                  <FileText size={18} /> Choose Resume
                </button>
                <input 
                  type="file" 
                  accept=".pdf,.txt,.docx"
                  onChange={handleFileChange}
                  style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                />
              </div>
              <span style={{ color: 'var(--primary)' }}>{file ? file.name : 'No file selected'}</span>
              
              <button 
                className="btn-primary" 
                style={{ marginLeft: 'auto' }}
                onClick={handleUploadResume}
                disabled={uploading || !file}
              >
                {uploading ? <Activity className="spin" size={18} /> : <Upload size={18} />}
                {uploading ? loadingMsg : 'Analyze & Start'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '600px', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Active Session</h3>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => setActiveSession(null)}>End Session</button>
          </div>
          
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {chat.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '12px',
                borderBottomRightRadius: msg.role === 'user' ? 0 : '12px',
                borderBottomLeftRadius: msg.role === 'ai' ? 0 : '12px',
              }}>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {msg.role === 'ai' ? <BrainCircuit size={14}/> : <Activity size={14}/>}
                  {msg.role === 'ai' ? 'InterviewForge AI' : 'You'}
                </div>
                <div style={{ lineHeight: '1.5' }}>{msg.text}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Type your answer here..." 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
            />
            <button className="btn-primary" onClick={handleSubmitAnswer}>
              Send <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
