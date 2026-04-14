import React, { useState, useMemo } from 'react'
import logo from './assets/logo.png'
import { 
  Globe, 
  ShieldCheck, 
  Users, 
  Settings, 
  ExternalLink,
  Monitor,
  Activity,
  CreditCard,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  User,
  BookOpen,
  Search,
  Copy,
  ChevronRight,
  Cpu,
  Mail,
  FileText,
  LogOut,
  Files,
  MessageSquare,
  ShieldAlert,
  ArrowLeft,
  Download,
  FileSpreadsheet,
  ClipboardList,
  Key,
  Target,
  MailPlus
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import LoginPage from './LoginPage'
import './App.css'

function App() {
  const { user, loading } = useAuth()
  const [activeItem, setActiveItem] = useState('systems')
  const [recipientName, setRecipientName] = useState(() => {
    return localStorage.getItem('iroha_recipient_name') || ''
  })

  const handleRecipientNameChange = (e) => {
    const value = e.target.value
    setRecipientName(value)
    localStorage.setItem('iroha_recipient_name', value)
  }

  const initialSystems = [
    { 
      id: 1, 
      name: 'Spurs 公式サイト', 
      url: 'https://spurs-inc.com', 
      icon: Globe, 
      status: 'online', 
      tags: ['Corporate', 'Public'],
      color: '#10b981', bg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
    },
    { 
      id: 2, 
      name: '稼働/帳票管理', 
      url: 'https://spurs-invoice.vercel.app', 
      icon: FileText, 
      status: 'online', 
      tags: ['Billing', 'Internal'],
      color: '#6366f1', bg: 'linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)'
    },
    { 
      id: 5, 
      name: '注力情報サイト', 
      url: 'https://spurs-portal.vercel.app/', 
      icon: Target, 
      status: 'online', 
      tags: ['Focus', 'Internal'],
      color: '#0ea5e9', bg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)'
    },
    { 
      id: 3, 
      name: 'パートナー管理', 
      url: 'https://partner-nexus.vercel.app/', 
      icon: Briefcase, 
      status: 'online', 
      tags: ['CRM', 'External'],
      color: '#d946ef', bg: 'linear-gradient(135deg, #e879f9 0%, #c026d3 100%)'
    },
    { 
      id: 4, 
      name: 'メール配信', 
      url: 'https://mailing-system-psi.vercel.app/', 
      icon: Mail, 
      status: 'online', 
      tags: ['Mailing', 'Internal'],
      color: '#f59e0b', bg: 'linear-gradient(135deg, #fcd34d 0%, #d97706 100%)'
    },
  ]

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
        <p>認証情報を確認中...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  const renderContent = () => {
    switch(activeItem) {
      case 'systems':
        return (
          <motion.section 
            className="systems-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-row">
              <div className="header-info">
                <h2>社内システム一覧</h2>
              </div>
            </div>
            
            <div className="systems-grid-detailed">
              {initialSystems.map((site, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', bounce: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="system-detail-card-cool" 
                  key={site.id}
                >
                  <div className="card-glow" style={{ background: site.bg }}></div>
                  <div className="card-content-wrapper">
                    
                    <div className="card-top-cool">
                      <div className="iroha-card-icon-wrapper" style={{ background: site.bg, boxShadow: `0 10px 24px ${site.color}40` }}>
                        <site.icon size={28} strokeWidth={2.5} color="white" />
                      </div>
                      <div className="status-badge-cool">
                        <div className="pulse-indicator"></div>
                        <span>稼働中</span>
                      </div>
                    </div>

                    <div className="iroha-card-content">
                      <h3>{site.name}</h3>
                      <div className="url-copy-container">
                        <p className="url-copy-cool">{site.url.replace('https://', '')}</p>
                        <button 
                          className="url-copy-btn-mini" 
                          onClick={(e) => {
                            navigator.clipboard.writeText(site.url);
                            const btn = e.currentTarget;
                            const originalContent = btn.innerHTML;
                            btn.innerHTML = 'Copied!';
                            btn.classList.add('copied');
                            setTimeout(() => {
                              btn.innerHTML = originalContent;
                              btn.classList.remove('copied');
                            }, 1500);
                          }}
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="iroha-card-footer">
                      <div className="tag-list">
                        {site.tags.map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                      <a href={site.url} className="enter-btn-cool" target="_blank" rel="noopener noreferrer" style={{ '--hover-color': site.color, textDecoration: 'none' }}>
                        <span>アクセス</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )
      case 'iroha':
        const irohaCategories = [
          { id: 'templates', title: '各種テンプレート', desc: '提案書、契約書など、対外・対内向け業務の標準テンプレート。', icon: Files, color: '#3b82f6', bg: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)' },
          { id: 'qa', title: '打ち合わせQA', desc: '商談や社内ミーティングで役立つFAQや、実践的な想定問答集。', icon: MessageSquare, color: '#10b981', bg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)' },
          { id: 'restrictions', title: '取引制限リスト', desc: '取引不可・要注意企業および業界の最新ブラックリストとガイド。', icon: ShieldAlert, color: '#ef4444', bg: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)', badge: '社外秘' },
          { id: 'hinagata', title: '各種雛形', desc: '業務運営に必要となる汎用的なドキュメント・各種資料の雛形集。', icon: ClipboardList, color: '#8b5cf6', bg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)' },
          { id: 'accounts', title: 'アカウント管理', desc: '各種アカウントID,Passの確認。※閲覧制限あり', icon: Key, color: '#64748b', bg: 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)', isExternal: true, path: 'https://docs.google.com/document/d/1ZgPSoEyrX-921nxQOCpbPC4c1HmmUPcn65gfH27up4E/edit?tab=t.0' }
        ]
        return (
          <motion.section 
            className="iroha-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="header-row">
              <div className="header-info">
                <h2>Spursいろは</h2>
              </div>
              <div className="iroha-search">
                <Search size={18} />
                <input type="text" placeholder="キーワードでマニュアルを検索..." />
              </div>
            </div>
            
            <div className="iroha-grid">
              {irohaCategories.map((cat, i) => (
                <motion.div 
                  className="iroha-premium-card" 
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                >
                  <div className="card-glow" style={{ background: cat.bg }}></div>
                  <div className="card-content-wrapper">
                    {cat.badge && (
                      <span className="confidential-badge">{cat.badge}</span>
                    )}
                    <div className="iroha-card-icon-wrapper" style={{ background: cat.bg, boxShadow: `0 10px 24px ${cat.color}40` }}>
                      <cat.icon size={28} strokeWidth={2.5} color="white" />
                    </div>
                    <div className="iroha-card-content">
                      <h3>{cat.title}</h3>
                      <p>{cat.desc}</p>
                      <div className="iroha-card-footer">
                        <span className="doc-count">最終更新: 本日</span>
                        <button className="enter-btn-cool" style={{ '--hover-color': cat.color }} onClick={() => {
                          if (cat.isExternal) {
                            window.open(cat.path, '_blank');
                          } else {
                            setActiveItem(cat.id);
                          }
                        }}>
                          <span>アクセス</span>
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )
      
      case 'templates':
        const templatesList = [
          { category: '契約関連', items: [
            { name: '秘密保持契約書（NDA）', type: 'Word', size: '24KB', file: '/templates/nda.docx', downloadName: `秘密保持契約書_${recipientName || '㈱〇〇'}御中.docx` },
            { name: '業務委託基本契約書（法人）', type: 'Word', size: '32KB', file: '/templates/kihon-keiyaku.docx', downloadName: `基本契約書_${recipientName || '㈱〇〇'}御中.docx` },
            { name: 'フリーランス基本契約書', type: 'Word', size: '28KB', file: '/templates/freelance-keiyaku.docx', downloadName: `フリーランス基本契約書_${recipientName || '〇〇'}様.docx` }
          ]},
          { category: 'セールス・提案', items: [
            { name: '会社説明資料（最新版）', type: 'PDF', size: '4.2MB', file: '/templates/company-profile.pdf', downloadName: 'Spurs会社説明資料.pdf' },
            { name: 'フリーランス登録説明資料', type: 'PDF', size: '1.5MB', file: '/templates/freelance-registration.pdf', downloadName: 'フリーランス登録説明資料.pdf' },
            { name: 'フリーランス開業マニュアル', type: 'PDF', size: '1.2MB', file: '/templates/freelance-manual.pdf', downloadName: 'フリーランス開業マニュアル.pdf' }
          ]},
          { category: '社内管理・その他', items: [
            { name: 'フリーランス用請求書', type: 'Excel', size: '45KB', file: '/templates/freelance-invoice.xlsx', downloadName: `ご請求書_${recipientName || '〇〇'}様.xlsx` },
            { name: '勤務表フォーマット', type: 'Excel', size: '64KB', file: '/templates/timesheet.xlsx', downloadName: `勤務表_${recipientName || '〇〇'}様.xlsx` }
          ]}
        ]
        return (
          <motion.section 
            className="template-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="header-row" style={{ marginBottom: '40px' }}>
              <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button 
                  className="back-btn-cool" 
                  onClick={() => setActiveItem('iroha')}
                >
                  <ArrowLeft size={20} />
                </button>
                <h2>各種テンプレート</h2>
              </div>
              <div className="recipient-setting-box">
                <div className="setting-label">
                  <User size={16} />
                  <span>宛名（保存名に反映）</span>
                </div>
                <input 
                  type="text" 
                  className="recipient-input" 
                  placeholder="例：株式会社Spurs" 
                  value={recipientName}
                  onChange={handleRecipientNameChange}
                />
              </div>
            </div>

            <div className="template-categories-wrapper">
              {templatesList.map((group, idx) => (
                <div key={idx} className="template-group-section">
                  <h3 className="template-group-title">{group.category}</h3>
                  <div className="template-file-grid">
                    {group.items.map((item, id) => (
                      <motion.div 
                        className="template-file-card" 
                        key={id}
                        whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
                      >
                        <div className="file-card-inner">
                          <div className={`file-badge ${item.type.toLowerCase()}`}>
                            {item.type === 'Excel' && <FileSpreadsheet size={22} />}
                            {(item.type === 'Word' || item.type === 'Text' || item.type === 'PDF') && <FileText size={22} />}
                            {item.type === 'PPT' && <Files size={22} />}
                          </div>
                          <div className="file-details">
                            <h4>{item.name}</h4>
                            <span className="file-meta">{item.type} • {item.size} • 最新版</span>
                          </div>
                          <a 
                            href={item.file}
                            download={item.downloadName || true} 
                            className="download-icon-btn"
                          >
                            <Download size={18} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )
      case 'restrictions':
        const restrictionsList = [
          { name: 'プリンチ株式会社', level: '禁止', reason: '社員への給与未払い、資金繰りに難あり' },
          { name: '株式会社ESP', level: '禁止', reason: '営業メンバーが少なく、コミュニケーションが取れない。\nトラブルに発展した際に所属が責任を取る理由がないと言い、取り合わない。' },
          { name: 'Vグループ企業', level: '注意', reason: 'トラブル多発、関連企業で人を取り合うため面談でない等もざら\nグループで人を回して営業しているため要注意' },
          { name: '株式会社GIOテクノロジーズ', level: '注意', reason: '社員への給与遅滞が発生\n資金繰りに難あり（相手方が上位の成約は禁止）' },
          { name: '株式会社All to Banquet', level: '注意', reason: '資金繰りに難あり（相手方が上位の成約は禁止）' },
          { name: '株式会社フナビス（FNBS）', level: '注意', reason: '資金繰りに難あり（相手方が上位の成約は禁止）\n支払い遅延等が過去発生' },
          { name: '株式会社D-code', level: '注意', reason: '要員のグリップが握れておらず、オファー承諾後辞退となり現場側とトラブルに\nトラブル時も対応に難があり、所属として対応を取ろうとしない' },
          { name: '株式会社GOOYA', level: '注意', reason: '要員の営業人数が多く、営業が手が回っていない為後出しでのトラブルが多発' },
          { name: 'テックビズ株式会社', level: '注視', note: '※但し、全てではない為営業との関係構築やスキルシートの見極めが必要', reason: '経歴詐称（未（微）経験を2年～最大6年盛る）' }
        ];

        return (
          <motion.section 
            className="template-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="header-row" style={{ marginBottom: '20px' }}>
              <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button 
                  className="back-btn-cool" 
                  onClick={() => setActiveItem('iroha')}
                >
                  <ArrowLeft size={20} />
                </button>
                <h2>取引制限リスト（社外秘）</h2>
              </div>
            </div>

            <div className="restrictions-warning-card">
              <div className="warning-icon-wrapper">
                <ShieldAlert size={32} color="#ef4444" />
                <h3 style={{ color: '#b91c1c', margin: 0, fontSize: '18px' }}>取り扱い厳重注意</h3>
              </div>
              <p className="warning-text">
                こちらの資料の閲覧には十分に注意し、<strong>他者への共有、口外は一切禁止</strong>いたします。<br/>
                何らかのトラブル等で弊社が取引を禁止または制限している企業になります。<br/>
                随時更新をしているため、数か月に1度確認をするようお願いいたします。
              </p>
              
              <div className="legend-box">
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#b91c1c' }}>☆ 扱いの説明 ☆</h4>
                <ul className="legend-list">
                  <li><span className="level-badge badge-ban">禁止</span> 一切の取引を禁止（情報交換、打ち合わせ、成約等）</li>
                  <li><span className="level-badge badge-warn">注意</span> 禁止はしていないものの、トラブルのリスクが高い為、警戒が必要</li>
                  <li><span className="level-badge badge-watch">注視</span> 取引に問題はないが、個別で警戒が必要になる時がある</li>
                </ul>
              </div>
            </div>

            <div className="restrictions-list">
              {restrictionsList.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className={`restriction-item border-${item.level === '禁止' ? 'ban' : item.level === '注意' ? 'warn' : 'watch'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="restriction-header">
                    <span className={`level-badge badge-${item.level === '禁止' ? 'ban' : item.level === '注意' ? 'warn' : 'watch'}`}>
                      {item.level}
                    </span>
                    <h3 className="company-name">{item.name}</h3>
                  </div>
                  <div className="restriction-body">
                    {item.note && <p className="restriction-note">{item.note}</p>}
                    <div className="restriction-reason-title">【 対象理由 】</div>
                    <div className="restriction-reason">{item.reason}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )
      case 'qa':
        const qaList = [
          { q: "資本金について", a: "50万円です。また、今後増資をしていく予定です。" },
          { q: "従業員数", a: "5名（2026年2月現在）です。\n正社員雇用についても準備を進めており、\n直接契約のフリーランスも今後増えていく予定です。" },
          { q: "稼働人数", a: "総稼働3名です。（2026年2月現在）" },
          { q: "支援費対応について", a: "積極的ではないですが、信頼関係の構築にあたり初成約時等\n必要に応じてご相談は可能です。\n※支援費案件は上位会社と所属会社が直接繋がるきっかけを提供することになる為、\n直接契約をされ、抜かれてしまうリスクがあります。\n上記の理由からできるだけ避けていただくようお願いいたします。" },
          { q: "案件の商流について", a: "元請け直が8割程度になり、それ以外が残りを占めている状況です。\nまた商流制限については、弊社と貴社との信頼関係を深めていけば、\n貴社一社先のご紹介であった場合でも基本制限は設けておりません。" },
          { q: "弊社独占案件等について", a: "概ね1か月に2～3件発生をしております。\n案件内容で行くと、ロースキル～ミドルスキルでローコードやSQL、運用保守\nが傾向として多いです。\n弊社優先案件に関しても上記同様な件数、スキル感となっています。" },
          { q: "案件 / 要員の営業比率について", a: "ご自身の営業されている比率をお答えください。\n会社全体としては、案件8割・要員2割程度の比率で動いています。" },
          { q: "インフラ / 開発案件の比率、領域について", a: "タイミングによるのが前提ですが、現状は開発案件が7割程度を占めています。\n階差として保有している案件の中だと、特に多いスキルは\n開発側：SQL・Java・ローコード\nインフラ側：運用保守（Linux）・AWS構築　　が多いです。" },
          { q: "配信について", a: "現状多くはないですが、配信をしております。（週2～3日、5件/週ペース）\n登録をされたいアドレスをいただければ追加いたします。\nまた、貴社でも配信をされているようでしたらこちらのアドレスをご追加ください。\nーー\nsales@spurs-inc.com（営業共通）\nーー" },
          { q: "現在営業中の直要員情報について", a: "プロパー、直フリーランスについては現状全て案件参画中となります。\n営業開始するタイミングで都度ご連絡いたします。" },
          { q: "採用方法、採用状況について", a: "有職も使用をしながらとはなりますが、基本は営業やエンジニアからの\nリファラル採用が中心となっています。" },
          { q: "体制案件（会社概要記載のもの）について", a: "基幹系システム（43人月）案件に関しては、プロパーも含めて参画している案件です\nその他の案件に関しては全てBP様にご支援をいただき、体制化をしています。" }
        ];
        return (
          <motion.section 
            className="template-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="header-row" style={{ marginBottom: '20px' }}>
              <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button 
                  className="back-btn-cool" 
                  onClick={() => setActiveItem('iroha')}
                >
                  <ArrowLeft size={20} />
                </button>
                <h2>打ち合わせQA（想定問答集）</h2>
              </div>
            </div>

            <div className="qa-intro-card">
              <div className="qa-intro-text">
                <p>打ち合わせ時に相手方から質問された内容に対する回答集です。<br/>是非ご活用ください。</p>
                <div className="qa-contact-box">
                  <span>💡 回答に困る質問がございましたら、お気軽にご連絡ください！</span>
                  <div className="qa-contact-details">
                    <strong>連絡先：</strong> <a href="mailto:support@spurs-inc.com?subject=打ち合わせQA 解答例作成依頼">support@spurs-inc.com</a><br/>
                    <strong>件　名：</strong> 打ち合わせQA 解答例作成依頼
                  </div>
                </div>
              </div>
            </div>

            <div className="qa-list-container">
              {qaList.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="qa-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="qa-q-row">
                    <span className="qa-badge q-badge">Q</span>
                    <h3 className="qa-question">{item.q}</h3>
                  </div>
                  <div className="qa-a-row">
                    <span className="qa-badge a-badge">A</span>
                    <div className="qa-answer">{item.a}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )
      case 'hinagata':
        const hinagataList = [
          { title: '案件サマリ雛形', content: `--S-p-u-r-s---------------------------　　　　　　　　　　　　　　　　　　　　　　　　　
 ≪ 案件名 ≫  

 ・ 概 要 　 ：　

 ・ 時 期  　：
 ・ 場 所  　：
 ・ 募 集  　：
 ・ 面 談  　：
----------
▽ 必須スキル ▽
 ・
 
▽ 歓迎スキル ▽
 ・
----------
 ・ 単 価  　：
 ・ 清算幅   ：
 ・ 商 流  　：
 ・ 年 齢  　：
 ・ 外国籍   ：可 / 不可
 ・ 事業主   ：可 / 不可
 ・ 備 考　  ：
---------------------------------------` },
          { title: '要員サマリ雛形', content: `--S-p-u-r-s---------------------------　　
 ≪ 基本情報 ≫　
　AA（〇歳 / 性別 / 国籍）
 ・ 所 属 　：
 ・ 最 寄 　：
 ・ 稼 働 　：
 ・ 単 価 　：
--------------------　
 ・保有スキル 　

 ・自己PR / 営業コメント等
    
--------------------　
 ・ 希 望 　：
 ・ 備 考 　：
---------------------------------------` },
          { title: '条件詳細雛形', content: `上位会社：${recipientName || '株式会社〇〇'}
ーーーーー
【 案件名 】　：

【 会社名 】　：${recipientName || '株式会社〇〇'}
【 要員名 】　：山田 太郎（やまだ たろう）様
【 入場日 】　：2026年〇月1日
【 初回期間 】：2026年〇月1日～〇月末日　
【 契約更新 】：単月 / 3か月 / その他（　　　）
【 就業時間 】： 

【 月額単価 】：
【 清算単位 】：〇分/日 , 〇分/月
【 清算幅 】　：
【 清算割 】　：上下割
【 超過単価 】：円 （10円未満切り捨て）
【 控除単価 】：円 （10円未満切り捨て）
【 サイト 】　：当月末〆翌々月〇日払い（〇日サイト）

【 勤務表 】
・フォーマット：現場 / 所属
・フロー　　　：貴社 ➡ Spurs　/　Spurs ➡ 貴社　
・提出期限　　：第〇営業日まで
・送付先　　　：（宛先）billing@spurs-inc.com  ※貴社から送付の場合
・送付先　　　：（ＣＣ）support@spurs-inc.com  ※貴社から送付の場合

【 請求書 】
・提出期限　　：第〇営業日まで
・送付先　　　：（宛先）　　
・送付先　　　：（ＣＣ）

【特記事項】　：
・振込手数料は貴社にてご負担をお願いいたします。
ーーーーー

所属会社：${recipientName || '株式会社〇〇'}
ーーーーー
【 案件名 】　：

【 会社名 】　：${recipientName || '株式会社〇〇'}
【 要員名 】　：山田 太郎（やまだ たろう）様
【 入場日 】　：2026年〇月1日
【 初回期間 】：2026年〇月1日～〇月末日　
【 契約更新 】：単月毎 / 3か月毎 / その他（　　　）
【 就業時間 】： 

【 月額単価 】：
【 清算単位 】：〇分/日 , 〇分/月
【 清算幅 】　：
【 清算割 】　：上下割
【 超過単価 】：〇円 （10円未満切り捨て）
【 控除単価 】：〇円 （10円未満切り捨て）
【 サイト 】　：当月末〆翌々月〇日払い（〇日サイト）

【 勤務表 】
・フォーマット：現場 / 所属
・フロー　　　：貴社 ➡ Spurs　/　Spurs ➡ 貴社　
・提出期限　　：第〇営業日まで
・送付先　　　：（宛先）billing@spurs-inc.com  ※貴社から送付の場合
・送付先　　　：（ＣＣ）support@spurs-inc.com  ※貴社から送付の場合

【 請求書 】
・提出期限　　：第〇営業日まで
・送付先　　　：（宛先）billing@spurs-inc.com
・送付先　　　：（ＣＣ）support@spurs-inc.com

【特記事項】　：
・振込手数料は弊社にてご負担いたします。
ーーーーー` },
          { title: 'クラウドミーツ等挨拶文', content: `${recipientName || '株式会社〇〇'}
〇〇様

初めまして、
Spurs株式会社 ITソリューション事業部の〇〇と申します。

弊社は、首都圏を中心としてSES事業を展開している企業です。
これまで東海エリアにてIT事業を行ってまいりましたが、
関東圏への本格進出を目指して体制を新たにし、本年（2026年）に設立いたしました。
会社としてはスタートしたばかりですが、
業界経験が豊富な営業メンバーで活動をしております。

弊社の最大の強みは、取扱案件の【90％以上が商流不問】である点です。
これまで培ってきたお客様との信頼関係を活かし、
共に成長していける新しいパートナー企業様を開拓しております。

もしよろしければ、情報交換やご挨拶を兼ねてオンラインで
一度お打ち合わせの機会をいただけないでしょうか。
〇〇様にて対面のお打ち合わせのご指定がなければ、
下記日程調整のURLから日時をご選択いただけますと幸いです。
対面でのお打ち合わせをご希望の場合は、候補日を複数頂戴できますと幸いです。
ーーー
（自分の使用している日程調整ツールのURLを添付してください。）
ーーー

また、ご挨拶の前に大変恐縮ではございますが、
貴社にて案件や人材情報のメール配信を行っていらっしゃいましたら、
ぜひ下記アドレス宛てにご送付いただけますと幸いです。

■ 情報配信先アドレス
sales@spurs-inc.com


貴社のビジネス拡大にも貢献できるよう尽力してまいります。
ご多用中のところ誠に恐れ入りますが、ご検討のほどよろしくお願いいたします。

弊社HP ： https://spurs-inc.com/
注力情報サイト ： https://spurs-portal.vercel.app/` },
          { title: 'HP問い合わせ', content: `ご担当者様

貴社のホームページを拝見し、
〇〇事業についてご協業をさせていただきたくご連絡差し上げました。

株式会社Spurs（スパーズ）の〇〇と申します。
弊社は東海エリアでのIT事業の実績を基に、関東圏への本格進出を目指して本年（2026年）に設立いたしました。
会社としては新しいものの、業界経験豊富な営業メンバーが揃っております。

弊社の強みは案件のグリップと、チーム提案の2点です。
これまで培ったお客様との信頼を活かし、月に複数件は弊社独占枠や優先枠の案件があり、長くお付き合いをさせていただいている取引先様を中心にチームでの実績も複数ございます。
貴社のご発展に弊社で何かお力になれることがないか
一度、ご挨拶や情報交換のお時間をいただけないでしょうか。
対面のお打ち合わせ、WEB形式でのお打ち合わせどちらでも対応可能ですので、ご指定をいただけますと幸いです。

貴社ビジネスの一助となれるよう尽力をいたします。
ご多用中のところ大変恐縮ですが、ご検討のほど何卒よろしくお願い申し上げます。

ーー
株式会社Spurs（スパーズ）
ITソリューション事業部 〇〇※名前
Email    ：〇〇〇@spurs-inc.com
弊社HP ： https://spurs-inc.com/
ーー` },
          { title: '問い合わせ受け雛形（返信用）', content: `${recipientName || '株式会社〇〇'}
〇〇様

お世話になっております。
Spurs株式会社の〇〇と申します。

この度は、〔弊社HPへお問い合わせ〕〔ご連絡〕をいただきまして
ありがとうございます。

弊社としましても是非ご協業に向け、
お打ち合わせをさせていただけたらと考えております。
対面形式でお打ち合わせのご希望がなければ、
下記日程調整のURLから日時をご選択いただけますと幸いです。
ーーー
（自分の使用している日程調整ツールのURLを添付してください。）
ーーー

また、ご挨拶の前に大変恐縮ではございますが、
貴社にて案件や人材情報のメール配信を行っていらっしゃいましたら、
ぜひ下記アドレス宛てにご送付いただけますと幸いです。

■ 情報配信先アドレス
sales@spurs-inc.com


以上となります。
ご確認のほど、何卒よろしくお願い申し上げます。` }
        ];
        return (
          <motion.section 
            className="template-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="header-row" style={{ marginBottom: '20px' }}>
              <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button 
                  className="back-btn-cool" 
                  onClick={() => setActiveItem('iroha')}
                >
                  <ArrowLeft size={20} />
                </button>
                <h2>各種雛形（コピー用）</h2>
              </div>
              <div className="recipient-setting-box">
                <div className="setting-label">
                  <User size={16} />
                  <span>宛名（コピー内容に反映）</span>
                </div>
                <input 
                  type="text" 
                  className="recipient-input" 
                  placeholder="例：株式会社Spurs" 
                  value={recipientName}
                  onChange={handleRecipientNameChange}
                />
              </div>
            </div>

            <div className="hinagata-toc">
              <span className="toc-label">📑 目次：</span>
              <div className="toc-pills-wrapper">
                {hinagataList.map((item, idx) => (
                  <button 
                    key={`toc-${idx}`} 
                    className="toc-pill"
                    onClick={() => {
                      document.getElementById(`hinagata-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="hinagata-grid">
              {hinagataList.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  id={`hinagata-${idx}`}
                  className="hinagata-card"
                  whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
                >
                  <div className="hinagata-header">
                    <h3>{item.title}</h3>
                    <button 
                      className="copy-btn-cool" 
                      onClick={(e) => {
                        navigator.clipboard.writeText(item.content);
                        const btn = e.currentTarget;
                        const originalHtml = btn.innerHTML;
                        btn.innerHTML = '<span style="font-size:12px; font-weight:bold;">Copied!</span>';
                        btn.classList.add('copied');
                        setTimeout(() => {
                           btn.innerHTML = originalHtml;
                           btn.classList.remove('copied');
                        }, 1500);
                      }}
                    >
                      <Copy size={16} /> <span>コピー</span>
                    </button>
                  </div>
                  <div className="hinagata-content">
                    <pre>{item.content}</pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )
      case 'settings':
        return (
          <section className="settings-view">
             <div className="header-row">
              <h2>設定</h2>
            </div>
            <p>システム設定はここから行います。</p>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div className="app-layout">
      {/* Background dynamic light effect */}
      <div className="bg-mesh-glow" />

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo} alt="SPURS Logo" className="sidebar-logo" />
        </div>
        
        <nav className="nav-links">
          <button 
            className={`nav-item ${activeItem === 'systems' ? 'active' : ''}`}
            onClick={() => setActiveItem('systems')}
          >
            <Monitor size={18} />
            <span>社内システム</span>
          </button>
          
          <button 
            className={`nav-item ${activeItem === 'iroha' ? 'active' : ''}`}
            onClick={() => setActiveItem('iroha')}
          >
            <BookOpen size={18} />
            <span>Spursいろは</span>
          </button>
          
          <div style={{ marginTop: 'auto' }}>
            <a 
              className="nav-item"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@spurs-inc.com&su=【ポータル要望】追加・修正依頼&body=※追加や修正を希望する内容を以下に記載してください。%0D%0A%0D%0A■ 対象ページ（ダッシュボード / Spursいろは 等）：%0D%0A%0D%0A■ 依頼概要：%0D%0A%0D%0A■ 詳細内容："
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <MailPlus size={18} />
              <span>修正・追記等依頼</span>
            </a>

            <div style={{ height: '1px', background: 'var(--border-light)', margin: '12px 0' }} />

            <div className="sidebar-user-info">
              <div className="sidebar-avatar">{user.displayName?.charAt(0) || '?'}</div>
              <div className="sidebar-user-details">
                <span className="sidebar-user-name">{user.displayName}</span>
                <span className="sidebar-user-email">{user.email}</span>
              </div>
              <button className="sidebar-logout-btn" onClick={() => signOut(auth)} title="ログアウト">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
