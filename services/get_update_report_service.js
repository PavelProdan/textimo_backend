// this module is used to get all the reports from the database ordered by "Open" report_status
// this module is also used to update a report using as parameters the report_id and the report_status

//function to get all the reports from the database ordered by "Open" report_status
function get_reports(){
    return new Promise((resolve, reject) => {
        db.reports.find({}).sort({report_status: 1}).exec((err, docs) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(docs);
                resolve(JSON.parse(JSON.stringify(docs)));
            }
        });
    });
}

//function to update a report using as parameters the report_id and the report_status
function update_report(report_id, report_status){
    return new Promise((resolve, reject) => {
        db.reports.update({_id: report_id}, {$set: {report_status: report_status}}, {}, (err, numReplaced) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(numReplaced);
                resolve(numReplaced);
            }
        });
    });
}

//module exports to be used in other files and exports the get_reports and update_report functions
module.exports = {
    get_reports: function(){
        return get_reports();
    }
    ,
    update_report: function(report_id, report_status){
        return update_report(report_id, report_status);
    }
};