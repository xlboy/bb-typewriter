/**
 * @description 复制文本功能
 */

export default function (text: string) {
    const input = document.createElement('textarea');
    input.style.cssText = 'position: absolute;opacity: 0;'
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
}