import XLSX from 'xlsx'

export const exportAsk = askList => {
    const newAsk = askList.map(ask => {
        const name = ask.anonymous ? 'anonymous' : ask.user.userName   
        const isAnswer = ask.isAnswer ? 'ตอบแล้ว' : 'ยังไม่ได้ตอบ'
        return {
            name: name,
            text: ask.text,
            date: ask.date,
            isAnswer: isAnswer
          }
    })  

    let ws = XLSX.utils.json_to_sheet(newAsk)
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Ask')
    XLSX.writeFile(wb, `ask-analyst.xlsx`)
};

export const exportFeedback = feedbackList => {
    const newFeedback = feedbackList.map(feedback => {

        return {
            emoticon: feedback.emoticon,
            text: feedback.text,
            date: feedback.date
          }
    })  

    let ws = XLSX.utils.json_to_sheet(newFeedback)
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Feedback')
    XLSX.writeFile(wb, `feedback-analyst.xlsx`)
};


