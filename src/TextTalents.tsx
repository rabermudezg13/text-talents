import { useEffect, useMemo, useRef, useState } from 'react'
import type { WorkBook } from 'xlsx'
import { BATCH_LIMIT, campaignPrompt, contactsCsv, prepareContacts, splitContacts, type Campaign } from './core'
import { findColumns, findHeader, openWorkbook, sheetRows } from './workbook'
import './text-talents.css'
const today = () => new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())
export default function TextTalents() {
  const [book,setBook]=useState<WorkBook|null>(null), [sheet,setSheet]=useState(''), [fileName,setFileName]=useState('')
  const [rows,setRows]=useState<unknown[][]>([]), [header,setHeader]=useState(1), [nameColumn,setNameColumn]=useState(-1), [phoneColumn,setPhoneColumn]=useState(-1)
  const [busy,setBusy]=useState(false), [error,setError]=useState(''), [dedupe,setDedupe]=useState(true), [countryCode,setCountryCode]=useState(false), [reviewed,setReviewed]=useState(false)
  const [downloaded,setDownloaded]=useState<number[]>([]), [copyStatus,setCopyStatus]=useState('')
  const [campaign,setCampaign]=useState<Campaign>({date:today(),location:'',sender:'',language:'English',tone:'Warm and encouraging',details:'',cta:'Reply YES if you are available and our team will help you find an assignment.'})
  const generation=useRef(0), promptRef=useRef<HTMLTextAreaElement>(null)
  useEffect(()=>()=>{generation.current++},[])
  const headers=rows[header-1]||[]
  const result=useMemo(()=>{
    if(!rows.length||nameColumn<0||phoneColumn<0||nameColumn===phoneColumn)return null
    return prepareContacts(rows,nameColumn,phoneColumn,header,dedupe)
  },[rows,nameColumn,phoneColumn,header,dedupe])
  const batches=useMemo(()=>splitContacts(result?.contacts||[]),[result])
  const prompt=useMemo(()=>campaignPrompt(campaign),[campaign])
  const invalidate=()=>{setReviewed(false);setDownloaded([])}
  const reset=()=>{generation.current++;setBook(null);setSheet('');setRows([]);setFileName('');setError('');setBusy(false);setNameColumn(-1);setPhoneColumn(-1);invalidate()}
  const selectHeader=(data:unknown[][], row:number)=>{setHeader(row);const columns=findColumns(data[row-1]||[]);setNameColumn(columns.name);setPhoneColumn(columns.phone);invalidate()}
  const selectSheet=(workbook:WorkBook, name:string)=>{
    setSheet(name);setRows([]);setNameColumn(-1);setPhoneColumn(-1);setError('');invalidate()
    try {const data=sheetRows(workbook,name);setRows(data);selectHeader(data,findHeader(data));if(!data.length)setError('This worksheet is empty. Select another sheet.')}catch(e){setError(e instanceof Error?e.message:'Unable to read this worksheet.')}
  }
  const load=async(file:File)=>{
    reset();const job=++generation.current;setBusy(true)
    try {
      if(!/\.(xlsx|xls)$/i.test(file.name))throw new Error('Choose an Excel workbook (.xlsx or .xls).')
      if(file.size>20*1024*1024)throw new Error('Use an Excel workbook smaller than 20 MB.')
      const data=await file.arrayBuffer();if(job!==generation.current)return
      const workbook=openWorkbook(data);setBook(workbook);setFileName(file.name);selectSheet(workbook,workbook.SheetNames[0])
    }catch(e){if(job===generation.current)setError(e instanceof Error?e.message:'Unable to open the workbook.')}
    finally{if(job===generation.current)setBusy(false)}
  }
  const download=(index:number)=>{
    if(!reviewed||!batches[index])return
    const csv=contactsCsv(batches[index],countryCode), url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})), link=document.createElement('a')
    const day=/^\d{4}-\d{2}-\d{2}$/.test(campaign.date)?campaign.date:'list'
    link.href=url;link.download=`text_talents_${day}_batch_${String(index+1).padStart(2,'0')}_of_${String(batches.length).padStart(2,'0')}.csv`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
    setDownloaded(current=>current.includes(index)?current:[...current,index])
  }
  const copy=async()=>{try{await navigator.clipboard.writeText(prompt);setCopyStatus('Prompt copied. Paste it into your preferred AI.')}catch{promptRef.current?.focus();promptRef.current?.select();setCopyStatus('Select and copy the prompt below with Ctrl+C or ⌘C.')}}
  const field=(key:keyof Campaign,value:string)=>{setCampaign(old=>({...old,[key]:value}));setCopyStatus('')}
  return <div className="text-talents">
    <header><div><p className="tt-eyebrow">CAFE CULTURA LLC · OUTREACH STUDIO</p><h1>Text Talents<span className="tt-title-dot">.</span></h1><p>Your next great connection starts here.</p></div><span className="tt-local"><span aria-hidden="true">●</span> Private by design · local processing</span></header>
    <div className="tt-intro"><p>One workbook. Ready-to-use lists.</p><span>Excel → Review → CSVs of 180 → Better outreach</span></div>
    <details className="tt-guide" open>
      <summary>How to use Text Talents <span>Quick start · 6 steps</span></summary>
      <ol>
        <li><h3>Open your Excel</h3><p>Click <strong>Open Excel</strong> and choose an .xlsx or .xls file under 20 MB. Your file is processed in this browser; it is not uploaded.</p></li>
        <li><h3>Choose the right columns</h3><p>Select your <strong>Worksheet</strong> and <strong>Header row</strong>. We look for headers such as Name, Phone Number, Mobile or Teléfono. If they are not detected, choose the <strong>Name column</strong> and <strong>Phone column</strong> yourself.</p></li>
        <li><h3>Review your contacts</h3><p>Check the preview and expand <strong>Review skipped rows</strong> if shown. Fix missing names or invalid US phone numbers in Excel and reopen the file. Choose whether to remove duplicate phones or include country code 1, then check the review confirmation.</p></li>
        <li><h3>Download each CSV</h3><p>Click <strong>Download CSV</strong> for each batch. Files contain only Name and Phone, with at most 180 contacts per CSV. For example, 181 contacts become two files: 180 + 1. Files go to your browser’s download location.</p></li>
        <li><h3>Create your message</h3><p>Set the work date, area, sender, language, tone, verified details and call to action. Click <strong>Copy prompt</strong>, paste it into your preferred AI and review its SMS suggestions. If copying is blocked, select the prompt and press Ctrl+C or ⌘C.</p></li>
        <li><h3>Use your lists in Sense</h3><p>Import each CSV into Sense and map Name and Phone to your account’s fields. Review recipients and the final message before sending there. Text Talents does not send texts. Use <strong>Clear workbook</strong> when finished; refreshing or closing this tab also clears the working list.</p></li>
      </ol>
    </details>
    <div className="tt-columns">
      <section className="tt-card" aria-labelledby="tt-csv-title"><h2 id="tt-csv-title"><span className="tt-step">01</span> Prepare your lists</h2><p>Open Excel, review names and phones, then download batches of up to {BATCH_LIMIT} contacts. Every CSV contains only Name and Phone.</p>
        <div className="tt-actions"><label className="tt-upload">Open Excel<input aria-label="Open Excel workbook" type="file" accept=".xlsx,.xls" onChange={e=>{const file=e.target.files?.[0];e.target.value='';if(file)void load(file)}} /></label><button type="button" onClick={reset}>Clear workbook</button></div>
        {busy&&<p role="status">Reading the workbook on this computer…</p>}{error&&<p className="tt-error" role="alert">{error}</p>}
        {book&&<><p className="tt-file">{fileName}</p><div className="tt-fields"><label>Worksheet<select value={sheet} onChange={e=>selectSheet(book,e.target.value)}>{book.SheetNames.map(name=><option key={name}>{name}</option>)}</select></label><label>Header row<input type="number" min="1" max={Math.min(50,Math.max(1,rows.length))} value={header} onChange={e=>selectHeader(rows,Math.max(1,Math.min(50,rows.length||1,Number(e.target.value)||1)))} /></label>
          {(['name','phone'] as const).map(kind=><label key={kind}>{kind==='name'?'Name column':'Phone column'}<select value={kind==='name'?nameColumn:phoneColumn} onChange={e=>{(kind==='name'?setNameColumn:setPhoneColumn)(Number(e.target.value));invalidate()}}><option value={-1}>Select a column</option>{headers.map((v,index)=><option key={index} value={index}>{String(v||`Column ${index+1}`)}</option>)}</select></label>)}</div>
          {(nameColumn<0||phoneColumn<0||nameColumn===phoneColumn)&&<p role="alert" className="tt-error">Select different name and phone columns to prepare the list.</p>}
          <label className="tt-check"><input type="checkbox" checked={dedupe} onChange={e=>{setDedupe(e.target.checked);invalidate()}}/>Keep the first contact per phone number</label>
          <label className="tt-check"><input type="checkbox" checked={countryCode} onChange={e=>{setCountryCode(e.target.checked);invalidate()}}/>Include US country code 1 (11 digits)</label>
        </>}
        {result&&<><div className="tt-stats"><div><strong>{result.contacts.length}</strong>Ready contacts</div><div><strong>{batches.length}</strong>CSV files</div><div><strong>{result.skipped.length}</strong>Skipped rows</div></div>
          <p>Each file has a header plus at most 180 contact rows. Source order is preserved. Blank rows ignored: {result.blankRows}. Duplicate phones skipped: {result.duplicates}.</p>
          {!!result.skipped.length&&<details><summary>Review skipped rows ({result.skipped.length})</summary><ul>{result.skipped.map(item=><li key={item.row}>Excel row {item.row}: {item.reason}</li>)}</ul></details>}
          {!!result.contacts.length&&<><h4>Preview · first {Math.min(5,result.contacts.length)} {result.contacts.length===1?'contact':'contacts'}</h4><div className="tt-table"><table><thead><tr><th>Name</th><th>Phone</th></tr></thead><tbody>{result.contacts.slice(0,5).map(c=><tr key={c.row}><td>{c.name}</td><td>{countryCode?'1':''}{c.phone}</td></tr>)}</tbody></table></div>
            <label className="tt-check"><input type="checkbox" checked={reviewed} onChange={e=>setReviewed(e.target.checked)}/>I reviewed the column mapping, preview and skipped rows.</label>
            <ol className="tt-batches">{batches.map((batch,index)=><li key={index}><span>CSV {index+1} of {batches.length} <small>{batch.length} {batch.length===1?'contact':'contacts'}</small></span><button disabled={!reviewed} onClick={()=>download(index)}>{downloaded.includes(index)?'Download again':'Download CSV'}</button></li>)}</ol></>}
        </>}
        <p className="tt-note">In Sense, map Name and Phone to the fields in your account’s CSV template. Choose the phone format your template uses. Numbers are not checked for SMS availability.</p>
      </section>
      <section className="tt-card" aria-labelledby="tt-prompt-title"><h2 id="tt-prompt-title"><span className="tt-step">02</span> Find the right words</h2><p>Set the work date and invitation details. Copy the prompt into your preferred AI to draft an engaging SMS with a clear CTA.</p>
        <div className="tt-fields"><label>Work date<input type="date" value={campaign.date} onChange={e=>field('date',e.target.value)}/></label><label>Message language<select value={campaign.language} onChange={e=>field('language',e.target.value)}>{['English','Spanish','English and Spanish'].map(x=><option key={x}>{x}</option>)}</select></label><label>Area or schools<input maxLength={200} value={campaign.location} onChange={e=>field('location',e.target.value)}/></label><label>Sender or team<input maxLength={160} value={campaign.sender} onChange={e=>field('sender',e.target.value)}/></label><label>Tone<select value={campaign.tone} onChange={e=>field('tone',e.target.value)}>{['Warm and encouraging','Energetic and upbeat','Friendly and direct'].map(x=><option key={x}>{x}</option>)}</select></label></div>
        <label>Verified assignment details (optional)<textarea maxLength={800} rows={3} value={campaign.details} onChange={e=>field('details',e.target.value)} placeholder="Locations, grade levels or confirmed details to include"/></label>
        <label>Call to action<textarea maxLength={400} rows={3} value={campaign.cta} onChange={e=>field('cta',e.target.value)}/></label>
        <label>AI prompt<textarea ref={promptRef} className="tt-prompt" rows={12} readOnly value={prompt}/></label><button className="tt-primary" onClick={()=>void copy()}>Copy prompt</button><p role="status">{copyStatus}</p>
        <p className="tt-note">The prompt does not include your workbook contacts. No AI requests or text messages are sent from Text Talents. Review the AI’s draft before using it in Sense.</p>
      </section>
    </div><footer>Files and contacts stay in this browser tab. Clear the workbook or close this page to release them. Only CSVs you download are saved.<div className="tt-credit">Created by Rodrigo Bermudez · Cafe Cultura LLC · with Love <span aria-hidden="true">♥</span></div></footer>
  </div>
}
