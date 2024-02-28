//GRADE CALCULATOR FOR SCHOOLOGY

//Gather all curent scores
scores_mixed = document.getElementsByClassName("ng-binding ng-scope");
scores = []; 
for(i=0;i<scores_mixed.length;i++){
     if(scores_mixed[i].innerText.includes("/")){
        scores.push(scores_mixed[i].innerText);
     }
}  
categories = document.getElementsByClassName("psonly ng-binding");

//sort all scores into respective categories
function sort(categories,scores){    
    category_dict = {"Quiz/Labs":[],"Assessments":[],"Coursework":[]};    
    for(i = 0;i<categories.length;i++){        
        if(categories[i].innerText == "Quiz/Labs"){
            category_dict["Quiz/Labs"].push(scores[i]);        
        }       
        else if(categories[i].innerText == "Assessments"){
            category_dict["Assessments"].push(scores[i]);
        }        
        else if(categories[i].innerText == "Coursework"){
            category_dict["Coursework"].push(scores[i]);
        }    
    }    
    return category_dict;
} 

grades = sort(categories,scores);

//seperate points possible vs points earned
function pointsEarned(category_scores,addPoints){
    earned = 0;    
    for(i=0;i<category_scores.length;i++){
        split_score = category_scores[i].split("/");        
        if(!(isNaN(parseFloat(split_score[0])))){
            earned+=parseFloat(split_score[0]);        
        }    
    }    
    earned+=parseFloat(addPoints);
    return earned;
}

function pointsPossible(category_scores,addPoints){
    max = 0;
    for(i=0;i<category_scores.length;i++){
        split_score = category_scores[i].split("/");
        if(!(isNaN(parseFloat(split_score[0])))){
            max+=parseFloat(split_score[1]);        
        }    
    }    
    max+=parseFloat(addPoints);    
    return max;
} 

function grade(category_scores){    
    return pointsEarned(category_scores,0)/pointsPossible(category_scores,0);
} 

quizLab_score = grade(grades["Quiz/Labs"]); 
assessmentScore = grade(grades["Assessments"]);
courseworkScore = grade(grades["Coursework"]);

grQuiz = quizLab_score*35;grTest = assessmentScore*55;
grHw = courseworkScore*10;

currentGrade = Math.round((grQuiz+grTest+grHw)*100)/100; 
categoryWeights = {"Quiz/Labs":0.35,"Assessments":0.55,"Coursework":0.10};
checkorguess = prompt("Have you taken this assignment yet: ");

if(checkorguess=="yes"){    
    type = prompt("Calculating for -> Quiz/Labs, Assessments, Coursework: ");    
    userScore = prompt("Enter score in x/y format: ");    
    splitScore = userScore.split("/");    
    e = pointsEarned(grades[type], splitScore[0]);    
    p = pointsPossible(grades[type], splitScore[1]);    
    if(type=="Quiz/Labs"){        
        newGrade = Math.round(((35*(e/p))+grHw+grTest)*100)/100;     
    }    
    else if(type=="Assessments"){        
        newGrade = Math.round(((55*(e/p))+grQuiz+grHw)*100)/100;    
    }    
    else if(type=="Coursework"){        
        newGrade = Math.round(((10*(e/p))+grQuiz+grTest)*100)/100;    
    }    
    alert("You now have a "+newGrade+"% in this class.");
}
else{    
    type = prompt("Calculating for -> Quiz/Labs, Assessments, Coursework: ");
    userGoal = prompt("Enter desired grade for the class: ");    
    workPoints = prompt("Enter how many points the new assignment is worth: ");     
    d = parseFloat(userGoal);
    e = pointsEarned(grades[type],0);    
    p = pointsPossible(grades[type], workPoints);    
    w = categoryWeights[type];    
    switch(type){        
        case "Quiz/Labs":            
            c = grTest + grHw;            
            break;        
    case "Assessments":            
        c = grQuiz + grHw;            
        break;        
    case "Coursework":            
        c = grTest + grQuiz;            
        break;    
}    

    x = p*((d-c)/(100*w))-e;    
    percentNeeded = Math.round((x/parseFloat(workPoints))*10000)/100;    

    alert("You need a score of "+percentNeeded.toString()+"% on this assignment to get "+userGoal+"% in this class");
}
