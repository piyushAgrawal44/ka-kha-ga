class TextUtil {
    getSubstring({str="", length=20}:{str: string, length?: number}){
        let output=str.substring(0,length);

        if(str.length>length) output+="...";
        
        return output
    }
}

export const TextUtilInstance=new TextUtil();