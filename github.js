import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const owner = "adityak-06";
const repo = "School-Kit-Manger";

const token = "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";

const octokit = new Octokit({ auth: token });

async function appendToJsonFile({ path, newEntry, message }) {
  try {
    const { data: file } = await octokit.repos.getContent({ owner, repo, path });

    const content = atob(file.content);
    const jsonArray = JSON.parse(content);

    jsonArray.push(newEntry);

    const updatedContent = btoa(JSON.stringify(jsonArray, null, 2));

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: updatedContent,
      sha: file.sha
    });

    console.log("✅ Updated:", path);
  } catch (err) {
    console.error("❌ Error updating:", err);
  }
}

export async function addDonation(newDonation) {
  return appendToJsonFile({
    path: "data/donations.json",
    newEntry: newDonation,
    message: "Add donation"
  });
}

export async function addRequest(newRequest) {
  return appendToJsonFile({
    path: "data/requests.json",
    newEntry: newRequest,
    message: "Add request"
  });
}
